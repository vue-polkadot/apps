import BN from 'bn.js';
import Connector from '@vue-polkadot/vue-api';

import {
  DeriveReferendumVote,
  DeriveReferendum,
} from '@polkadot/api-derive/types';
import {
  ReferendumInfoTo239,
  ReferendumStatus,
} from '@polkadot/types/interfaces';

interface State {
  voteCount: number;
  voteCountAye: number;
  voteCountNay: number;
  votedAye: BN;
  votedNay: BN;
  votedTotal: BN;
}

const defaultState: State = {
  voteCount: 0,
  voteCountAye: 0,
  voteCountNay: 0,
  votedAye: new BN(0),
  votedNay: new BN(0),
  votedTotal: new BN(0),
};

function isCurrentStatus(
  status: ReferendumStatus | ReferendumInfoTo239,
): status is ReferendumStatus {
  return !!(status as ReferendumStatus).tally;
}

function calcOldState(votesFor: DeriveReferendumVote[]): State {
  return votesFor.reduce(
    (state, { balance, vote }): State => {
      const isDefault = vote.conviction.index === 0;
      const counted = balance
        .muln(isDefault ? 1 : vote.conviction.index)
        .divn(isDefault ? 10 : 1);

      if (vote.isAye) {
        state.voteCountAye++;
        state.votedAye = state.votedAye.add(counted);
      } else {
        state.voteCountNay++;
        state.votedNay = state.votedNay.add(counted);
      }

      state.voteCount++;
      state.votedTotal = state.votedTotal.add(counted);

      return state;
    },
    { ...defaultState },
  );
}

const setState = (state: State, newState: State): State => {
  return { ...state, ...newState };
};

const referendumState = async (
  referendum: DeriveReferendum,
): Promise<State> => {
  const { api } = Connector.getInstance();
  let state = { ...defaultState };
  if (api && api.query.democracy.votersFor) {
    const votes = await api.derive.democracy.referendumVotesFor(
      referendum.index,
    );
    if (isCurrentStatus(referendum.status)) {
      state = setState(state, {
        ...defaultState,
        votedAye: referendum.status.tally.ayes,
        votedNay: referendum.status.tally.nays,
        votedTotal: referendum.status.tally.turnout,
      });
    } else if (votes) {
      state = setState(state, calcOldState(votes));
    }
  }

  return state;
};

export default referendumState;
