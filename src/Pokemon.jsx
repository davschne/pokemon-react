var React = require('react');

var Pokemon = React.createClass({
  render: function() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <img src={this.props.spriteUrl}/>
        <ul>
          <li>Attack: {this.props.attack}</li>
          <li>Defense: {this.props.defense}</li>
          <li>HP: {this.props.hp}</li>
        </ul>
      </div>
    );
  }
});

module.exports = Pokemon;
