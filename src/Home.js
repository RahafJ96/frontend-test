import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Card,Button } from 'react-bootstrap';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      allDrinks:[],
    }
  }
  componentDidMount(){
    axios.get('http://localhost:3001/getData').then(result=>{
      this.setState({allDrinks:result.data})
      console.log(this.state.allDrinks);
    })
    .catch(err=>{console.log(err);})
  }
  addToFavorite(drinkObj){
    console.log('clicked');
    const {user}=this.props.auth0;
    const newDrink ={
      drinkName:drinkObj.strDrink,
      drinkImg:drinkObj.strDrinkThumb,
    }
    const params={
      userEmail:user.email,
      drinkObj:newDrink,
    }
    axios.post('http://localhost:3001/addData',params).catch(err=>{console.log(err);});
  }

  
  render() {
    return(
      <Jumbotron>
        <h1>Welcome to the home page</h1>
        {this.state.allDrinks.length && this.state.allDrinks.map((drink,idx)=>{
          return(
          <Card style={{width:'20rem',display:'inline-block'}}>
            <Card.Title>{drink.strDrink}</Card.Title>
            <img src={drink.strDrinkThumb} style={{width:'20rem'}}/>
            <Button variant='success' onClick={()=>{this.addToFavorite(drink)}}>Add to Favorite</Button>
          </Card>
          )
        })}
        
      </Jumbotron>
    )
  }
}

export default withAuth0(Home);
