import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { loadOfficers } from '../../../store/officerReducer';

function renderOfficerForm({ fields, meta }){
  return <div className="officers__list">
    <button onClick={ ()=>{ fields.push({}) } } >Add Officer</button>
    {
      fields.map( ( officer, index )=>{
      return <div className="officers__officer"> 
        <Field component={ "input" }
          name={`${officer}.position`} 
          className="officers__detail"
          placeholder="Position" />
        <Field component={ "input" }
              name={`${officer}.name`} 
              className="officers__detail"
              placeholder="Name" />
        <Field component={ "input" }
              name={`${officer}.email`} 
              className="officers__detail"
              placeholder="email" />
        <Field component={ "input" }
              name={`${officer}.euid`} 
              className="officers__detail"
              placeholder="euid" />
        <button type="button" onClick= {()=>{ console.log("TODO:Delete", fields, officer); fields.remove(index) } } >x</button>
      </div>
    })
    }
  </div>
}

export class UpdateOfficers extends Component {
  
  constructor(){
    super()
    this.state = {
      officers: []
    }
  }
  componentWillMount(){
    this.props.fetchOfficers()
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.officers.length && !this.props.initialized){
      nextProps.initialize({officers:nextProps.officers})
    }
  }
  updateOfficers = values => {
    console.log(values)
  }
  render() {
    const { handleSubmit } = this.props
    console.log(this.props)
    return (
      <div className="section__main">
        <h2>Update Officers</h2>
        <button className="add-event"> Add Officer </button>
        <div className="card">
        {
          <form className="officers__form"
              onSubmit={ handleSubmit(this.updateOfficers) } >
              <FieldArray component={ renderOfficerForm } name="officers" />      
              <button type="submit" className="btn save">Update</button>
            </form>
        }

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  officers: state.officers.officers
})
const mapDispatchToProps = dispatch =>({
  fetchOfficers: bindActionCreators(loadOfficers, dispatch )
})
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'update-officers'
  })
)(UpdateOfficers)