var React = require('react');
var request = require('superagent');
var pokeurl = 'http://pokeapi.co/';

var Pokemon = require('./Pokemon.jsx');

var PokemonContainer = React.createClass({

  loadPokemonData: function(uri) {
    var that = this;
    // get Pokemon data
    request
      .get(pokeurl + uri)
      .end(function(err, res) {
        if (err) return console.error(err);
        var p = JSON.parse(res.text);
        // set properties on state
        that.setState({
          attack: p.attack,
          defense: p.defense,
          hp: p.hp,
          moves: p.moves
        });
        // get sprite
        request
          .get(pokeurl + p.sprites[0].resource_uri)
          .end(function(err, res) {
            if (err) return console.error(err);
            // set sprite URL on state
            that.setState({
              spriteUrl: pokeurl + JSON.parse(res.text).image
            });
          });
      });
  },

  takeDamage: function(damage) {
    var newHP = this.state.hp - damage;
    if (newHP <= 0) {
      newHP = 0;
      this.props.defeated();
    }
    this.setState({
      hp: newHP
    });
  },

  getInitialState: function() {
    return {
      name: this.props.name,
      spriteUrl: "",
      attack: 0,
      defense: 0,
      hp: 0,
      moves: [],
      defeated: false
    };
  },

  componentDidMount: function() {
    this.loadPokemonData(this.props.resource_uri);
  },

  render: function() {
    return (
      <li>
        <Pokemon {...this.state}/>
        <button disabled={this.state.defeated}
                onClick={this.props.attack.bind(this, this.state.attack, 20)}
        >
          Attack!
        </button>
      </li>
    );
  }
});

module.exports = PokemonContainer;
