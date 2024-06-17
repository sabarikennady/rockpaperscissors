import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RPSGame = () => {
  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);
  const [winnerColor, setWinnerColor] = useState('');
  const [result, setResult] = useState('');
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdown, setCountdown] = useState(3);

  const choices = ['rock', 'paper', 'scissors'];

  useEffect(() => {
    if (!showCountdown) determineWinner();
  }, [player1Choice, player2Choice]);

  useEffect(() => {
    if (countdown > 0 && showCountdown) {
      const timer = setTimeout(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && showCountdown) {
      setShowCountdown(false);
      setCountdown(3);
    }
  }, [countdown, showCountdown]);

  const handlePlayerChoice = (player, choice) => {
    if (player === 1) {
      setPlayer1Choice(choice);
    } else {
      setPlayer2Choice(choice);
    }
  };

  const determineWinner = () => {
    if (player1Choice !== null && player2Choice !== null) {
      if (player1Choice === player2Choice) {
        setResult("It's a tie!");
        setWinnerColor('#8B6995');
      } else if (
        (player1Choice === 'rock' && player2Choice === 'scissors') ||
        (player1Choice === 'scissors' && player2Choice === 'paper') ||
        (player1Choice === 'paper' && player2Choice === 'rock')
      ) {
        setResult('Blue Wins!');
        setWinnerColor('#2196F3');
      } else {
        setResult('Red Wins!');
        setWinnerColor('#f44336');
      }
    }
  };

  const resetGame = () => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setResult('');
    setShowCountdown(true);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.section, styles.blueBackground]}>
        <Text style={styles.playerInfo}>Player 1</Text>
        <View style={styles.choiceButtons}>
          {choices.map(choice => (
            <TouchableOpacity
              key={choice}
              style={styles.iconButton}
              onPress={() => handlePlayerChoice(1, choice)}
              disabled={player1Choice !== null || result !== '' || showCountdown}
            >
              <Text style={styles.iconText}>{choice === 'rock' ? '🪨' : choice === 'paper' ? '🧻' : '✂️'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={[styles.section, styles.resultContainer, {transform: [{ rotate: '180deg' }]}]}>
      <Text style={[styles.result, { color: winnerColor }]}>{result || player1Choice ? result: 'Choose your option!'}</Text>
        {result && !showCountdown && (
          <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
            <Text style={styles.resetButtonText}>Play Again</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.divider} />
      <View style={[styles.section, styles.resultContainer]}>
      <Text style={[styles.result, { color: winnerColor }]}>{result|| player2Choice ? result: 'Choose your option!'}</Text>
        {result && !showCountdown && (
          <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
            <Text style={styles.resetButtonText}>Play Again</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.section, styles.redBackground]}>
        <Text style={styles.playerInfo}>Player 2: {player2Choice}</Text>
        <View style={styles.choiceButtons}>
          {choices.map(choice => (
            <TouchableOpacity
              key={choice}
              style={styles.iconButton}
              onPress={() => handlePlayerChoice(2, choice)}
              disabled={player2Choice !== null || result !== '' || showCountdown}
            >
              <Text style={[styles.iconText]}>{choice === 'rock' ? '🪨' : choice === 'paper' ? '🧻' : '✂️'}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {showCountdown && (
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{countdown}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 50,
  },
  playerInfo: {
    fontSize: 20,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  choiceButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconButton: {
    marginHorizontal: 10,
  },
  iconText: {
    color: 'white',
    fontSize: 50,
  },
  resultContainer: {
    alignItems: 'center',
  },
  result: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  resetButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  blueBackground: {
    backgroundColor: '#2196F3',
    transform: [{ rotate: '180deg' }],
  },
  redBackground: {
    backgroundColor: '#f44336',
  },
  divider: {
    borderBottomColor: '#ddbde7',
    borderBottomWidth: 5,
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalText: {
    fontSize: 100,
    color: 'white',
  },
});

export default RPSGame;
