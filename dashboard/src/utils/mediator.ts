import Vue from 'vue'
import ApiService from './vueApi'
import NS from './vueNotification'



interface MediatorServiceInterface {
  handleUrlChange(apiUrl: string): void;
}


// Idea. 
/**
 * ApiService - Magic under the hood™️
 */
class MediatorService extends Vue implements MediatorServiceInterface {

  public handleUrlChange(apiUrl: string) {
    ApiService.changeUrl(apiUrl).then(this.onApiChanged, this.onApiError)
  }

  public async onApiChanged(api: any) {
    NS.info('api changed')
    const chainProperties = await api.registry.getChainProperties();
    console.log('chainProperties', chainProperties);
    (Vue as any).store.commit('setChainProperties', chainProperties)

  }

  public onApiError(err: any) {
    console.warn(err)
    NS.error('Api err')
  }

}


const bus = new MediatorService();
export default bus

// Idea. make builder pattern for api ? Api.query('').withParams([])
