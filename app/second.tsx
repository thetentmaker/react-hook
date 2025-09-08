import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function SecondScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  
  const scrollToTop = () => {
    console.log("scrollToTop 버튼이 눌렸습니다!");
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const scrollToBottom = () => {
    console.log("scrollToBottom 버튼이 눌렸습니다!");
    scrollViewRef.current?.scrollToEnd({
      animated: true,
    });
  };
  
  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>두 번째 화면</Text>
                
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <View style={styles.spacer} />
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.scrollToTopButton}
          onPress={scrollToTop}
        >
          <Text style={styles.scrollToTopButtonText}>맨 위로</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.scrollToBottomButton}
          onPress={scrollToBottom}
        >
          <Text style={styles.scrollToBottomButtonText}>맨 아래로</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            console.log("Back button pressed");
            router.back();
          }}
        >
          <Text style={styles.backButtonText}>뒤로가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
    minHeight: 2000, // 스크롤을 위한 충분한 높이
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 30,
    marginTop: 50,
  },
  longContent: {
    alignItems: 'center',
    marginVertical: 50,
  },
  contentText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  spacer: {
    height: 100,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
    width: '100%',
    borderRadius: 8,
  },
  bottomText: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  scrollToTopButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 0.3,
    alignItems: 'center',
  },
  scrollToTopButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollToBottomButton: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 0.3,
    alignItems: 'center',
  },
  scrollToBottomButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 0.3,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
