'use client';
import { useEffect, useState } from "react";
import { Input, Button } from "@material-tailwind/react";

export default function VerifyPermission({ onVerify }: { onVerify: (data: { verified: boolean }) => void }) {

    const [password, setPassword] = useState("");
    const [showPassword, setIsShowPassword] = useState(false);

    const PasswordEye = () => {

        return (
            <>
                {showPassword ?
                    <i className="fas fa-eye-slash"></i>
                    :
                    <i className="fas fa-eye"></i>
                }
            </>
        )
    };
    ``
    const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        console.log("onChange :", target.value)
        setPassword(target.value);
    }

    const validatePS = () => {
        console.log("validatePS :", password.length);
        onVerify?.({ verified: true })
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex-grow border-t border-gray-400 mb-5 mt-5 md:mb-10" ></div>
            <div className=' pt-2 px-0 flex justify-center md:justify-start' >
                <h4 className='project-title md:project-title-md'>Case Studies</h4>
            </div>
            <div className='text-sm md:text-lg py-3'>
                If you would like to access my case studies<br />
                please contact me
            </div>
            <div className="relative flex w-full max-w-[24rem]">
                <Input
                    type={showPassword ? 'text' : 'password'}
                    label="Enter password"
                    // icon={<i className="fas fa-heart " />}
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    className="pr-20 "
                    containerProps={{
                        className: "min-w-0 ",
                    }}
                    crossOrigin={undefined}
                // onPointerEnterCapture={() => { }}
                // onPointerLeaveCapture={() => { }}
                />
                <span className="!absolute left-[14rem] top-2 password-toggle-icon" onClick={() => {
                    setIsShowPassword(isPassword => !isPassword)
                }}> <PasswordEye /> </span>
                <Button
                    size="sm"
                    color={password ? "gray" : "blue-gray"}
                    disabled={password !== 'Balla@Designer94'}
                    className="!absolute right-1 top-1 rounded"
                    onClick={validatePS}
                    // @ts-ignore
                    placeholder=""
                // onPointerEnterCapture={() => { }}
                // onPointerLeaveCapture={() => { }}
                >
                    Get Access
                </Button>

            </div>
            <div className="flex-grow border-t border-gray-400  mb-5 mt-10"></div>
        </div>
    )
}
