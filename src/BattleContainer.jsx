var React = require('react');
var PokemonContainer = require('./PokemonContainer.jsx');

var BattleContainer = React.createClass({

  attack: function(targetId, attack, power, accuracy) {
    var target = this.state.pokemon[targetId];
    var rand = (Math.round(Math.random * 38) + 217) / 255;
    var damage = (((attack * power) / (targetId.defense * 50)) + 2) * rand;

  },

  render: function() {
    var pokemonContainers = this.props.pokemon.map(function(pokemon) {
      return <PokemonContainer key={pokemon.name} {...pokemon}/>;
    });
    return (
      <div>{pokemonContainers}</div>
    );
  }
});

module.exports = BattleContainer;
