import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';
import * as commons from '../utils/commons';
import { showAlert } from '../common/sharedOperations';

/**
 * @description React component to show Deck's item.
 */
class DeckItem extends Component {

  navigateToDeck = () => {
    const { deck, doNavigate, navigation } = this.props;
    if (doNavigate === true) {
      navigation.navigate('DeckDetail', { deckId: deck.id, deckTitle: deck.title });
      //TODO: adicionar animação de carta virando
    }
  }

  render() {
    const { deck, questionsCount, doNavigate, navigation } = this.props;
    if (commons.isNull(deck)) {
      showAlert('WARNING','Select a valid Deck.');
      navigation.goBack();
      return <View></View>
    }
    let qcount = 0;
    if (!commons.isNull(questionsCount)) {
      qcount = questionsCount;
    }
    const mainStyle = doNavigate ? styles.card : styles.empty;
    return (
      <TouchableWithoutFeedback onPress={() => this.navigateToDeck()}>
        <View style={mainStyle} >
          <Text style={[styles.title]}>
            {deck.title}
          </Text>
          <Text style={[styles.count]}>
            {qcount} Card{qcount === 1 ? '' : 's'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps({ questions }, { deck, doNavigate }) {
  let questionsCount = 0;
  if (!commons.isNull(deck)) {
    questionsCount = Object.values(questions).filter(question => question.deck === deck.id).length;
  }
  return {
    deck,
    questionsCount,
    doNavigate
  };
}

export default withNavigation(connect(mapStateToProps)(DeckItem));

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
  },
  card: {
    borderColor: COLORS.BLUE,
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
    padding: 10,
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
