var React = require('react');
var PokemonContainer = require('./PokemonContainer.jsx');

var BattleContainer = React.createClass({

  // attack formula adapted from:
  // https://www.math.miami.edu/~jam/azure/compendium/battdam.htm
  attack: function(attackerRefIndex, attack, power) {
    var attacker = this.refs['pokemon' + attackerRefIndex];
    var target = this.refs['pokemon' + (1 - attackerRefIndex)];
    var rand = ((Math.random() * 38) + 217) / 255;
    var damage = Math.round((((attack * power) / (target.state.defense * 50)) + 2) * rand);
    var message = attacker.props.name + ' attacks ' + target.props.name + ' for ' + damage + ' damage!';
    this.setState({
      message: message
    });
    target.takeDamage(damage);
  },

  defeated: function(refIndex) {
    var pokemon = this.refs['pokemon' + refIndex];
    pokemon.setState({
      defeated: true
    });
    this.setState({
      message: pokemon.props.name + ' is defeated!'
    });
  },

  getInitialState: function() {
    return {
      message: ''
    }
  },

  render: function() {
    var that = this;
    var pokemonContainers = this.props.pokemon.map(function(pokemon, i) {
      return (
        <PokemonContainer key={pokemon.name}
                          ref={'pokemon' + i}
                          attack={that.attack.bind(that, i)}
                          defeated={that.defeated.bind(that, i)}
                          {...pokemon}/>
      );
    });
    return (
      <main>
        <ul>{pokemonContainers}</ul>
        <p>{this.state.message}</p>
      </main>
    );
  }
});

module.exports = BattleContainer;
