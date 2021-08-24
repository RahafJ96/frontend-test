import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card,Button,Modal,Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap-floating-label';

class FavDrinks extends React.Component {
  constructor(props){
    super(props);
    this.state={
      favDrinksArr:[],
      showModel:false,
      index:-1,
      drinksObj:{},
      drinkName:'',
    }
  }
  componentDidMount(){
    const {user}=this.props.auth0;
    axios.get('http://localhost:3001/getDataFav',{params:{userEmail:user.email}}).then(result=>{
      this.setState({favDrinksArr:result.data})
      console.log(this.state.favDrinksArr);
    })
    .catch(err=>{console.log(err);})
  }
  deleteDrink=(idx)=>{
    const {user}=this.props.auth0;
    axios.delete(`http://localhost:3001/deleteData/${idx}`,{params:{userEmail:user.email}}).then(result=>{
      this.setState({ favDrinksArr:result.data})
      })
  }
  updateData=(drink,idx)=>{
    console.log('clicked');
    this.setState({
      drinkObj:drink,
      index:idx,
      drinkName:drink.drinkName,
      showModel:true,
    })

  }

  closeModel=()=>{
    this.setState({
      showModel:false,
    })
  }

  submitHandler=(e)=>{
    e.preventDefault();
    this.closeModel();
    const newName=e.target.drinkName.value;
    const newDrinkObj={
      drinkName:newName,
      drinkImg:this.state.drinkObj.drinkImg,
    }
    const {user}=this.props.auth0;
    const params={
      userEmail:user.email,
      drinkObj:newDrinkObj
    }
    axios.put(`http://localhost:3001/updateData/${this.state.index}`,params).then(result=>{
      this.setState({
        favDrinksArr:result.data
      })

    })
  }
  render() {
    return(
      <Jumbotron>

        <h1>My Favorite Drinks</h1>
        <p>
          This is a collection of my favorite drinks
        </p>
       
        {this.state.favDrinksArr.length && this.state.favDrinksArr.map((drink,idx)=>{
          return(
            <Card style={{width:'20rem',display:'inline-block'}}>
              <Card.Title>{drink.drinkName}</Card.Title>
              <img src={drink.drinkImg} style={{width:'20rem'}}/>
              <Button variant='danger' onClick={()=>{this.deleteDrink(idx)}}>Delete</Button>
              <Button variant='warning'onClick={()=>{this.updateData(drink,idx)}} >Update</Button>
            </Card>
          )
        }) }
         {this.state.showModel && 
        <>
        <Modal show={this.state.showModel} onHide={this.closeModel}>
         <Modal.Header closeButton>
         <Modal.Title>Update Form</Modal.Title>
     </Modal.Header>
     <Modal.Body>
       <Form onSubmit={this.submitHandler}>
  
             <Form.Control type="text" name="drinkName" defaultValue={this.state.drinkName} />
         
         <Button variant="secondary" type='submit'>
             Update
         </Button>
     </Form>
     </Modal.Body>
     <Modal.Footer>
         <Button variant="secondary" onClick={this.closeModal}>
             Close
         </Button>

     </Modal.Footer>
 </Modal>
 </>
 }
      </Jumbotron>
    )
  }
}

export default withAuth0(FavDrinks);
