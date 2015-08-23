var React = require('react');
var PokemonContainer = require('./PokemonContainer.jsx');

var BattleContainer = React.createClass({

  printRefs: function() {
    console.log(this.refs);
  },

  // attack formula adapted from:
  // https://www.math.miami.edu/~jam/azure/compendium/battdam.htm
  attack: function(targetRefIndex, attack, power) {
    var target = this.refs['pokemon' + targetRefIndex];
    var rand = ((Math.random() * 38) + 217) / 255;
    var damage = Math.round((((attack * power) / (target.state.defense * 50)) + 2) * rand);
    target.takeDamage(damage);
  },

  render: function() {
    var that = this;
    var pokemonContainers = this.props.pokemon.map(function(pokemon, i) {
      return (
        <PokemonContainer key={pokemon.name}
                          ref={'pokemon' + i}
                          attack={that.attack.bind(that, 1 - i)}
                          {...pokemon}/>
      );
    });
    return (
      <ul>{pokemonContainers}</ul>
    );
  }
});

module.exports = BattleContainer;
