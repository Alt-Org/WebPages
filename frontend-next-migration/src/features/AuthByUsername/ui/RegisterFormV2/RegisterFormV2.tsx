'use client';
import { useClientTranslation } from '@/shared/i18n';
import { useRegisterForm } from '../../model/useRegisterForm';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { BaseAuthForm } from '@/entities/Auth';

type Props = {
    toLoginPage: string;
};

export const RegisterForm = (props: Props) => {
    const { toLoginPage } = props;

    const { t } = useClientTranslation('auth');
    const { register, handleSubmit, onFormSubmit, errors } = useRegisterForm(toLoginPage);

    return (
        <BaseAuthForm
            header={t('register')}
            fields={
                <>
                    <BaseAuthForm.InputField
                        key={'username'}
                        error={errors?.username?.message && t(`${errors.username.message}`)}
                        label={t('username')}
                        inputProps={{ ...register('username'), required: true }}
                    />
                    <BaseAuthForm.InputField
                        key={'password'}
                        error={errors?.password?.message && t(`${errors.password.message}`)}
                        label={t('password')}
                        inputProps={{ ...register('password'), type: 'password', required: true }}
                    />
                    <BaseAuthForm.InputField
                        key={'repeatPassword'}
                        error={
                            errors?.repeatPassword?.message && t(`${errors.repeatPassword.message}`)
                        }
                        label={t('password_again')}
                        inputProps={{
                            ...register('repeatPassword'),
                            type: 'password',
                            required: true,
                        }}
                    />
                    <BaseAuthForm.Checkbox
                        key={'ageConsent'}
                        error={errors?.ageConsent?.message && t(`${errors.ageConsent.message}`)}
                        label={t('age_Consent')}
                        inputProps={{ ...register('ageConsent', { required: true }) }}
                    />
                </>
            }
            actions={
                <>
                    <BaseAuthForm.SubmitButton>{t('send')}</BaseAuthForm.SubmitButton>
                    <AppLink
                        theme={AppLinkTheme.PRIMARY}
                        to={toLoginPage}
                    >
                        {t('text_to_login')}
                    </AppLink>
                </>
            }
            onSubmit={handleSubmit(onFormSubmit)}
        />
    );
};
