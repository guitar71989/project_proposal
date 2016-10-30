import React from 'react';

class LooForm extends React.Component {
  constructor(props){
    super(props);
    this.coords = {lat: props.lat, lng: props.lng};

    this.state = {
      name: "",
      address: "",
      latittude: null,
      longitude: null,
      imageFile: null,
      imageUrl: null
    };

    this.navigateToSearch = this.navigateToSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFile = this.updateFile.bind(this);

  }

  navigateToSearch() {
    this.props.router.push("/");
  }

  update(field){
    return(e) => this.setState({ [field]: event.target.value } );
  }

  updateFile(e) {
    var file = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function(){
      this.setState( {imageFile: file, imageUrl: fileReader.result });
    }.bind(this);

    if (file){
      fileReader.readAsDataURL(file);
    }

  }

  handleSubmit(e){
    e.preventDefault();

    var formData = new FormData();

    formData.append("loo[name]", this.state.name);
    formData.append("loo[address]", this.state.address);
    formData.append("loo[latittude]", this.state.latitude);
    formData.append("loo[longitude]", this.state.longitude);
    formData.append("loo[image]", this.state.imageFile);
    this.props.createLoo(formData);
    this.navigateToSearch();
  }

  render () {
    return(
      <div className="new-loo-form-ctn group">
        <h1>Add a Loo</h1>

        <form className='new-loo-form group'>

          <input className='new-loo-form-name'
                 type="text"
                 placeholder="name"/>

          <input type="text" className="new-loo-form-address" placeholder="address" />

          <input type="file" onChange={this.updateFile} className="new-loo-form-image" />

          <input className='new-loo-form-submit'
                type="submit"
                value="Create Loo" />

          <img src={this.state.imageUrl} />

        </form>

      </div>
    );
  }

}

export default LooForm;


// <label className='new-loo-form-lat-label'>Latitudes</label>
//  <input className='new-loo-form-lat'
//         type="text" value={this.coords.lat} readOnly />


// <label className='new-loo-form-lng-label'>Longitudes</label>
// <input className='new-loo-form-lng'
//        type="text" value={this.coords.lng} readOnly />
