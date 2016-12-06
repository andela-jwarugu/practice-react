import React, {PropTypes} from 'react';
import request from 'superagent';
import isEmpty from 'lodash';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      users: [],
      repos: '',
      following: '',
      followers: '',
      username: ''
    }

    this.fetchUsers = this.fetchUsers.bind(this);
    this.getRepos = this.getRepos.bind(this);
    this.getFollowing = this.getFollowing.bind(this);
    this.getFollwers = this.getFollowers.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.backButton = this.backButton.bind(this);
    this.handleListItem = this.handleListItem.bind(this);
  }

  componentDidMount() {
    this.fetchUsers().then((response)=>{
      this.setState({users: response.body})
    }).catch((err) => {
      console.log(err);
    })
  }

  backButton() {
    this.setState({isSearching: false});
  }

  fetchUsers() {
    return (
      request
        .get('https://api.github.com/orgs/andela/members?client_id=CLIENT_ID&client_secret=CLIENT_SECRET')
    )
  }

  getRepos(username) {
    return (
      request
        .get('https://api.github.com/users/'+ username + '?client_id=CLIENT_ID&client_secret=CLIENT_SECRET' )
    )
  }

  handleSearch() {
    this.getRepos(this.state.username).then((response) => {
      const userInfo = response.body;
      this.setState({isSearching: true, repos: userInfo.public_repos, following: userInfo.following, followers: userInfo.followers })
    })
  }
  handleListItem() {
    
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({username: value})
  }

  getFollowing() {

  }

  getFollowers() {

  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div>
          <div className='text-xs-center'>
            <h3>Github Andela Search</h3>
          </div><br/>
          <div className='row col-md-6 offset-md-3'>
            <div className='input-group'>
              <input type='text'
                    onChange={this.handleChange}
                    className='form-control'
                    placeholder='Github Username' />
              <span className='input-group-btn'>
                <button className='btn btn-secondary' type='button' onClick={this.handleSearch}> Search </button>
              </span>
            </div>
          </div>
        </div>
        <br /><br />
        <hr />
        <div className='row'>
          <div className='col-md-4 offset-md-4'>
            {!this.state.isSearching ?
              <div>
              {!this.state.users.length ?
                <span> Loading.. </span> :
                  <div className='card'>
                    <div className='card-block'>
                      <h4 className='card-title'> List of Github Users</h4>
                      <p className='card-text'>
                        Here is a list of some andela members on github
                      </p>
                    </div>
                      <ul className='list-group list-group-flush'>
                        {this.state.users.map((user) => (
                          <li className='list-group-item' value={user.login} onClick={this.handleListItem} key={user.id}> {user.login} </li>
                        ))}
                      </ul>
                  </div>}
                </div>
                 :
              <div className='card'>
                <div className='card-block'>
                    <h4 className='card-title'> {this.state.username} </h4>
                </div>

                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'> Repos: {this.state.repos}</li>
                  <li className='list-group-item'> Followers: {this.state.followers}</li>
                  <li className='list-group-item'> Following: {this.state.following}</li>
                </ul>
                <div className='card-block'>
                  <button className='btn btn-primary' onClick={this.backButton}> Go Back </button>
                </div>

              </div>


            }
            </div>
          </div>
      </div>
    )

  }
}

App.propTypes = {
};
