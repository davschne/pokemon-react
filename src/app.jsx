var React = require('react');
var request = require('superagent');
var pokeurl = 'http://pokeapi.co/';

var BattleContainer = require('./BattleContainer.jsx');

var App = React.createClass({

  choosePokemon: function() {
    function choose(array) {
      var index = Math.floor(Math.random() * 151);
      return array[index];
    };
    request
      .get(pokeurl + 'api/v1/pokedex/1/')
      .end(function(err, res) {
        if (err) return console.error(res);
        var allPokemon = JSON.parse(res.text).pokemon;
        this.setState({
          pokemon: [choose(allPokemon), choose(allPokemon)]
        })
      }.bind(this));
  },

  getInitialState: function() {
    return {
      pokemon: []
    };
  },

  componentDidMount: function() {
    this.choosePokemon();
  },

  render: function() {
    return (
      <body>
        <header>
          <h1>Pokemon Battle</h1>
        </header>
        <BattleContainer pokemon={this.state.pokemon}/>
      </body>
    );
  }
});

React.render(<App/>, document.body);
