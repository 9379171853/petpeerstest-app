import { PolymerElement, html } from '@polymer/polymer/polymer-element';

class PetsList extends PolymerElement {
  constructor() {
    super();
  }
  ready() {
    super.ready();
    var ajaxpets = this.$.ajaxCall;
    ajaxpets.url = "http://localhost:3000/allPets";
    // ajaxCall.onResponse = "_handleResponse";
  }
  static get properties() {
    return {
      data: Array, 
      actionType: {
        type: String,
        value: 'list'
      }     
    }
  }

  _handleResponse(event) {
    this.data = event.detail.response;
    if (this.actionType === 'list') {
      this.data = event.detail.response;
      console.log(event.detail.response);
    } else {
      this.actionType = 'list';
      let ajaxCall = this.$.ajaxCall;
      ajaxCall.method = 'GET';
      ajaxCall.url = "http://localhost:3000/allPets";
      //ajaxCall.generateRequest();
    }

    //this.$.ajaxCall.generateRequest();
  }

  checkStatus(status) {
    console.log("status", status)
    if (status === "New") {      
      return true;
    } else {
      return false;
    }
  }

  _buySubmit(e){
    this.actionType = 'buy';
    let item = e.model.item;
    console.log(item);
    var ajaxpets = this.$.ajaxCall;
    ajaxpets.method = "post";
    
    let obj = { id: item.id, userName: sessionStorage.getItem("username") };
    console.log(obj);
    ajaxpets.body = JSON.stringify(item);
    ajaxpets.url = "http://localhost:3000/buyPet",
    ajaxpets.generateRequest();
  }


  static get template() {
    return html`
    <style>        
      paper-button.indigo {
        background-color: gray;
        color: white;           
      }

      .reg-button{       
        background-color: blue;
        color: white;
        font-family: sans-serif; 
      } 
      
    </style>
    <p>PETS details </p>
    <iron-ajax 
         auto
        id="ajaxCall"
        url="http://localhost:3000/allPets"
        on-response="_handleResponse"
        > </iron-ajax>

    <div>Number of PETS: --{{data.length}} </div><br/>
    <vaadin-grid items={{data}} column-reordering-allowed>
    <vaadin-grid-column>
      <template class="header">Id</template>
      <template>[[item.id]]</template>
   </vaadin-grid-column>
  <vaadin-grid-column>
      <template class="header">Description</template>
      <template>[[item.partName]]</template>
    </vaadin-grid-column>
    <vaadin-grid-column>
      <template class="header">Age</template>
      <template>[[item.age]]</template>
    </vaadin-grid-column>
    <vaadin-grid-column>
      <template class="header">boughtBy</template>
      <template>[[item.boughtBy]]</template>
    </vaadin-grid-column>
    <vaadin-grid-column>
      <template class="header">createdBy</template>
      <template>[[item.createdBy]]</template>
    </vaadin-grid-column>
    <vaadin-grid-column>
    <template>
        <template class="header">Action</template>
          <template is="dom-if" if="[[checkStatus(item.status)]]">           
          <paper-button class="reg-button" raised on-click="_buySubmit">BUY </paper-button>
          </template>
          <template is="dom-if" if="[[!checkStatus(item.status)]]">
            [[item.status]]
          </template>
    </template>
    </vaadin-grid-column>       
  </vaadin-grid>
        
      </vaadin-grid>  
    `;
  }  
}

customElements.define('pets-list', PetsList);