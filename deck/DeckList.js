import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
import DeckItem from './DeckItem';
import * as commons from '../utils/commons';

/**
 * @description React component to show a Deck's list.
 */
class DeckList extends Component {
  render() {
    const { decks } = this.props;
    if (commons.isEmpty(decks)) {
      return showAlert(
        Object.assign({}, {title: 'INFORMATION', message: 'There are no Decks, please, create new ones.'}, {
          buttons: [{ text: 'OK' }]
        })
      );
    }
    return (
      <ScrollView style={styles.list}>
        {Object.values(decks).map(deck =>
          <DeckItem key={deck.id} deck={deck} doNavigate={true}/>
        )}
      </ScrollView>
    );
  }
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps({ decks }) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: 'column',
  }
});
