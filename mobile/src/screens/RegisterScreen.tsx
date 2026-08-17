import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { Screen } from '../components/Screen';
import { BackButton } from '../components/BackButton';
import { uiStyles } from '../components/styles';
import { TextField } from '../components/TextField';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../constants/schema';
import { RegisterFormValues } from '../types/form';
import { PasswordField } from '../components/PasswordField';
import { PrimaryButton } from '../components/PrimaryButton';
import { FooterPrompt } from '../components/FooterPrompt';
import { useAuth } from '../auth/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const [formError, setFormError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { register } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (
  values: RegisterFormValues,
) => {
  try {
    setFormError('');

    await register(values);

    // The authenticated navigator switches to Home automatically.
  } catch (e) {
    console.error("Error register: ", e)
    setFormError(
      'Unable to create your account. Please try again.',
    );
  }
};

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={uiStyles.authScroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <BackButton onPress={() => navigation.goBack()} />

          <View style={uiStyles.authHeader}>
            <Text style={uiStyles.authTitle}>Create account</Text>
            <Text style={uiStyles.authSubtitle}>
              Start tracking your finances
            </Text>
          </View>

          <View style={uiStyles.form}>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  autoCapitalize="words"
                  autoComplete="name"
                  error={errors.fullName?.message}
                  label="FULL NAME"
                  placeholder="Alex Johnson"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  autoCapitalize="none"
                  autoComplete="email"
                  error={errors.email?.message}
                  keyboardType="email-address"
                  label="EMAIL"
                  placeholder="you@example.com"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <PasswordField
                  autoCapitalize="none"
                  error={errors.password?.message}
                  label="PASSWORD"
                  placeholder="Min. 8 characters"
                  secure={!isPasswordVisible}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onToggleSecure={() =>
                    setIsPasswordVisible((current) => !current)
                  }
                />
              )}
            />
          </View>

          {formError ? (
            <Text style={uiStyles.formError}>{formError}</Text>
          ) : null}

          <View style={uiStyles.bottomActions}>
            <PrimaryButton
              loading={isSubmitting}
              title="Create account"
              onPress={handleSubmit(onSubmit)}
            />

            <FooterPrompt
              linkText="Sign in"
              prefix="Have an account?"
              onPress={() => navigation.replace('SignIn')}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}