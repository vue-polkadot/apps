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

  public mounted() {
    ApiService.$on('change', this.onApiChanged)
  }

  public handleUrlChange(apiUrl: string) {
    // TODO: call this from settings there is a blackbox for it rn
  }

  public onApiChanged(api: any) {
    NS.info('api changed')
  }




}


const bus = new MediatorService();
export default bus

// Idea. make builder pattern for api ? Api.query('').withParams([])
