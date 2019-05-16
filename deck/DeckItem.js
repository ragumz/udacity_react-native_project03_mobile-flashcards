import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { TouchableWithoutFeedback, View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { COLORS } from '../utils/constants';
import * as commons from '../utils/commons';
import * as constants from '../utils/constants';
import { showAlert } from '../common/sharedOperations';
import { handleDeleteDeck } from './deckOperations';

/**
 * @description React component to show Deck's item.
 */
class DeckItem extends Component {
  state = {
    rotation: new Animated.Value(0)
  };

  runAnimation = () => {
    const { rotation } = this.state;
    //reset animation
    rotation.setValue(0);
    //setup animation
    return Animated.spring(rotation, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true
    });
  };

  handleNavigateToDeck = () => {
    const { deck, doNavigate, navigation } = this.props;
    if (doNavigate === true) {
      //start the animation and at the end navigate to DeckDetail
      this.runAnimation().start(() => {
        navigation.navigate('DeckDetail', {
          deckId: deck.id,
          deckTitle: deck.title
        });
      });
    }
  };

  deleteDeck = () => {
    const { deck, dispatch } = this.props;
    dispatch(handleDeleteDeck(constants.OWNER_VIEWS.DECK_ITEM, deck.id));
  }

  handleAskDelete = () => {
    const { doNavigate } = this.props;
    if (doNavigate === true) {
      showAlert(commons.getUserMessage('QUESTION',
        'Do you want to delete this Deck and all its Cards permanently?', null,
        [{text: 'No'}, {text: 'Yes', onPress: () => this.deleteDeck()}]));
    }
  }

  render() {
    const { deck, cardsCount, doNavigate, navigation, viewStyle } = this.props;
    if (commons.isNull(deck)) {
      showAlert(commons.getUserMessage('WARNING', 'Select a valid Deck.'));
      navigation.goBack();
      return <View />;
    }
    let qcount = 0;
    if (!commons.isNull(cardsCount)) {
      qcount = cardsCount;
    }
    let propStyle = viewStyle;
    if (commons.isNull(propStyle)) {
      propStyle = styles.empty;
    }
    //setup animation
    const { rotation } = this.state;
    const rotate = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: [`0deg`, `360deg`]
    });
    //choose style depending on props doNavigate
    const mainStyle = doNavigate
      ? [styles.card, { transform: [{ rotateY: rotate }] }]
      : propStyle;
    const titleStyle = doNavigate
      ? styles.title
      : [styles.title, { fontSize: 24 }]
    const countStyle = doNavigate
      ? styles.count
      : [styles.count, { fontSize: 20 }]
    //TODO: onLongPress={() => this.handleAskDelete()}
    return (
      <TouchableWithoutFeedback
        onPress={() => this.handleNavigateToDeck()}>
        <Animated.View style={mainStyle}>
          <Text style={titleStyle}>
            {deck.title}
          </Text>
          <Text style={countStyle}>
            {qcount} Card{qcount === 1 ? '' : 's'}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

/**
 * @description Extract component's props data from Redux state and props args into one object.
 */
function mapStateToProps({ cards }, { deck, doNavigate, viewStyle }) {
  let cardsCount = 0;
  if (!commons.isNull(deck)) {
    cardsCount = Object.values(cards).filter(card => card.deck === deck.id).length;
  }
  return {
    deck,
    cardsCount,
    doNavigate,
    viewStyle,
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
    width: '95%',
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
