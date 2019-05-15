import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { TouchableWithoutFeedback, View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { COLORS } from '../utils/constants';
import * as commons from '../utils/commons';
import { showAlert } from '../common/sharedOperations';

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

  navigateToDeck = () => {
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
    return (
      <TouchableWithoutFeedback onPress={() => this.navigateToDeck()}>
        <Animated.View style={mainStyle}>
          <Text style={[styles.title]}>{deck.title}</Text>
          <Text style={[styles.count]}>
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
    viewStyle
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
