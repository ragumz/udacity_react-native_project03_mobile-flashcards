import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';
import * as commons from '../utils/commons';

/**
 * @description React component to show Deck's item.
 */
class DeckItem extends Component {

  render() {
    const { deck, questions } = this.props;
    let qcount = 0;
    if (!commons.isEmpty(questions)) {
      qcount = Object.values(questions).filter(question => question.deck === deck.id).length;
    }
    return (
      <View style={styles.card}>
        <Text style={[styles.title]}>
          {deck.title}
        </Text>
        <Text style={[styles.count]}>
          {qcount} Card{qcount === 1 ? '' : 's'}
        </Text>
      </View>
    );
  }

}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps({ questions }, { deck }) {
  return {
    deck,
    questions
  };
}

export default connect(mapStateToProps)(DeckItem);

const styles = StyleSheet.create({
  card: {
    borderColor: COLORS.BLUE,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    padding: 10,
    height: 80,
    width: "95%",
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.BLUE
  },
  count: {
    fontSize: 16,
    color: COLORS.GRAY
  }
});
