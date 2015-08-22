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

  getInitialState: function() {
    return {
      name: this.props.name,
      spriteUrl: "",
      attack: 0,
      defense: 0,
      hp: 0,
      moves: []
    };
  },

  componentDidMount: function() {
    this.loadPokemonData(this.props.resource_uri);
  },

  render: function() {
    return (
      <Pokemon {...this.state}/>
    );
  }
});

module.exports = PokemonContainer;
