import {FieldValues, useForm} from "react-hook-form";
import {CustomForm} from "@/shared/ui/CustomForm";
import cls from "./RegisterForm.module.scss"
import {IUserRegisterDto, useRegisterMutation} from "@/entities/Auth";
import {ValidationRegisterSchema} from "../../validations";
import {yupResolver} from "@hookform/resolvers/yup";


export const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors},
    } = useForm({
        resolver: yupResolver(ValidationRegisterSchema),
    });


    const [login, { data, isLoading, isError ,error}] = useRegisterMutation();


    async function onFormSubmit (fieldValues : FieldValues) {
        await login(fieldValues as IUserRegisterDto);
    }

    return(
        <CustomForm  className={cls.Form} onSubmit={handleSubmit(onFormSubmit)}>

            <CustomForm.Header>
                Register
            </CustomForm.Header>

            <CustomForm.InputField
                key={"username"}
                error={errors?.username?.message}
                label={"Username"}
                inputProps={{...register('username'),
                    required: true
                }}
            />

            <CustomForm.InputField
                key={"password"}
                error={errors?.password?.message}
                label={"Password"}
                inputProps={{...register('password'),
                    type: "password",
                    required: true
                }}
            />

            <CustomForm.InputField
                key={"repeatPassword"}
                error={errors?.repeatPassword?.message}
                label={"Repeat password"}
                inputProps={{...register('repeatPassword'),
                    type: "password",
                    required: true
                }}
            />


            <CustomForm.Button type="submit">
                Submit
            </CustomForm.Button>
        </CustomForm>
    )

}
