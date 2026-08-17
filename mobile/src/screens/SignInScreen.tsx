import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Screen } from '../components/Screen';
import { BackButton } from '../components/BackButton';
import { uiStyles } from '../components/styles';
import { PrimaryButton } from '../components/PrimaryButton';
import { FooterPrompt } from '../components/FooterPrompt';
import { PasswordField } from '../components/PasswordField';
import { TextField } from '../components/TextField';
import { colors } from '../constants/theme';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInFormValues } from '../types/form';
import { signInSchema } from '../constants/schema';
import { useAuth } from '../auth/AuthContext';


type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export function SignInScreen({ navigation }: Props) {
  const [formError, setFormError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
  signIn,
  requestPasswordReset,
} = useAuth();

  const {
    control,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });


  const onSubmit = async (
  values: SignInFormValues,
) => {
  try {
    setFormError('');

    await signIn(values);

    // Do not navigate manually to Home.
    // The authenticated navigator will switch automatically.
  } catch {
    setFormError(
      'Unable to sign in. Please check your credentials.',
    );
  }
};

  const handleForgotPassword = async () => {
  const isEmailValid = await trigger('email');

  if (!isEmailValid) {
    return;
  }

  try {
    await requestPasswordReset(getValues('email'));

    Alert.alert(
      'Check your email',
      'Password reset instructions have been sent.',
    );
  } catch {
    Alert.alert(
      'Not available',
      'Password reset is not currently available.',
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
            <Text style={uiStyles.authTitle}>Sign in</Text>
            <Text style={uiStyles.authSubtitle}>Welcome back</Text>
          </View>

          <View style={uiStyles.form}>
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
                  labelAccessory={
                    <Pressable onPress={handleForgotPassword}>
                      <Text
                        style={{
                          color: colors.primary,
                          fontSize: 12,
                          fontWeight: '600',
                        }}
                      >
                        Forgot password?
                      </Text>
                    </Pressable>
                  }
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
              title="Sign in"
              onPress={handleSubmit(onSubmit)}
            />

            <FooterPrompt
              linkText="Create one"
              prefix="No account?"
              onPress={() => navigation.replace('Register')}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}