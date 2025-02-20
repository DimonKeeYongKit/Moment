import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Link } from 'expo-router';
import { GridStyles } from '@/styles/global';

export default function SettingsScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [themeModalVisible, setThemeModalVisible] = useState(false);

  const themeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' },
  ];

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setColorScheme(theme);
    setThemeModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={[GridStyles.scrollViewContainer, {backgroundColor:colorScheme === 'dark' ? GridStyles.ThemeDark.backgroundColor : GridStyles.ThemeWhite.backgroundColor}]}>
    <View>
      {/* 配置部分 */}
      <Text style={GridStyles.sectionTitle}>配置</Text>
      <TouchableOpacity
        style={styles.option}
        onPress={() => setThemeModalVisible(true)}
      >
        <Text style={styles.optionText}>颜色主题</Text>
        <Text style={styles.optionValue}>
          {colorScheme === 'dark' ? '深色' : '浅色'}
        </Text>
      </TouchableOpacity>

      {/* 更多部分 */}
      <Text style={GridStyles.sectionTitle}>更多</Text>
      <Link href="/about" asChild>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>关于</Text>
        </TouchableOpacity>
      </Link>

      {/* 主题选择弹窗 */}
      <Modal
        transparent={true}
        visible={themeModalVisible}
        onRequestClose={() => setThemeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>选择主题</Text>
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.modalOption}
                onPress={() => handleThemeChange(option.value as 'light' | 'dark' | 'system')}
              >
                <Text style={styles.modalOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setThemeModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>取消</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 16,
  },
  optionValue: {
    fontSize: 16,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
});