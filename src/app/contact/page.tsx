
'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import emailjs from "@emailjs/browser";
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pageheaders from '@/components/ui/Pageheaders';
import emailIcon from '../../../public/icons/contact/email.png';
import linkedInIcon from '../../../public/icons/contact/linkedin.png';
import figmaIcon from '../../../public/icons/contact/figma.png';
import youTubeIcon from '../../../public/icons/contact/youtube.png';
import instagramIcon from '../../../public/icons/contact/instagram.png';

type contactData = {
  user_name: string
  user_email: string
  message: string
}

const Contact = () => {

  const form = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<contactData>()

  const onSubmit: SubmitHandler<contactData> = (data) => {
    // console.log('SubmitHandler data: ', data);
    sendEmail(JSON.stringify(data));
  }
  // console.log('Watching user_name: ', watch("user_name")) // watch input value by passing the name of it

  const [sendingMail, setSendingMail] = useState(false);

  const sendEmail = (data: string) => {
    // console.log('sendEmail data: ', data);
    // console.log('sendEmail form.current: ', form.current);
    if (!form.current) return;
    setSendingMail(true);
    emailjs
      .sendForm(
        "service_aclt6nw",
        "template_ogh2ssm",
        form.current,
        "5oXks4dMnKbrARvb_"
      )
      .then(
        (result) => {
          form.current?.reset();
          toast.success("Message sent successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            // theme: darkTheme ? "dark" : "light",
          });
          // console.log(result.text);
          setSendingMail(false);
        },
        (error) => {
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            // theme: darkTheme ? "dark" : "light",
          });
          // console.log(error.text);
          setSendingMail(false);
        }
      );
  };

  return (
    <article className="pr-2 md:pr-0">
      <Pageheaders information={`Let's Connect!`} />
      <div className="grid grid-cols-12">

        <div className="col-span-12 md:col-span-8">
          {/* contact form */}
          <h4 className='font-medium md:text-xl my-2 px-0 md:px-1'>Message Me</h4>
          {/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
          <form
            ref={form}
            className=""
            id="contact-form"
            action="php/mail.php"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-12">
              <div className='col-span-12 md:col-span-6 px-0 md:px-1 my-1'>
                <input
                  {...register("user_name")}
                  type="text"
                  className="text-[#4B5563] font-light placeholder-[#4B5563] bg-[#F9FAFB] rounded w-full py-2 px-1 md:px-2 leading-tight focus:outline-none focus:border-primary"
                  required
                  placeholder="Name"
                  defaultValue={""}
                />
                {errors.user_name && <span>This field is required</span>}
              </div>
              <div className='col-span-12 md:col-span-6 px-0 md:px-1 my-1' >
                <input
                  {...register("user_email")}
                  type="email"
                  className="text-[#4B5563] font-light placeholder-[#4B5563] bg-[#F9FAFB] rounded w-full py-2 px-1 md:px-2 leading-tight focus:outline-none focus:border-primary"
                  required
                  placeholder="Email"
                  defaultValue={""}
                />
                {errors.user_email && <span>This field is required</span>}
              </div>

              <div className='col-span-12 pt-2 px-0 md:px-1' >
                <textarea
                  {...register("message")}
                  className="text-[#4B5563] font-light placeholder-[#4B5563] bg-[#F9FAFB] rounded w-full py-2 px-1 md:px-2 leading-tight focus:outline-none focus:border-primary"
                  rows={5}
                  required
                  placeholder="Message"
                  defaultValue={""}
                />
                {errors.message && <span>This field is required</span>}
              </div>

              <div className='col-span-12 my-10 px-0 md:px-1'>

                <button className="btn-primary  flex w-full justify-center"
                  id="submit-btn"
                  type="submit"
                >
                  {sendingMail ? (
                    <>
                      <span
                        role="status"
                        aria-hidden="true"
                        className="spinner-border spinner-border-sm align-self-center me-2"
                      ></span>
                      Sending.....
                    </>
                  ) : (
                    <>Send Message</>
                  )}

                </button>
              </div>
            </div>

            <ToastContainer />

          </form>
        </div>

        <div className="col-span-12 md:col-span-1">
        </div>
        <div className="col-span-12 md:col-span-3 p-0 md:p-2 md:pl-6">
          <h4 className='font-medium md:text-xl my-0'>Contact</h4>

          <div className='flex flex:none font-thin my-2 text-base' >
            <Image
              className="object-scale-down"
              src={emailIcon}
              alt="Email"
              unoptimized
              width={14}
              height={11}
            />
            &nbsp; ld@ballalight.design
          </div>

          {/* <div className='font-thin my-3 text-base ' >
            <i className="fas fa-phone " />
            &nbsp; +971561586948
          </div> */}

          <h4 className='font-medium md:text-xl my-6'>Social Media</h4>

          <div className='my-auto  flex justify-left'>
            <Link href={'https://www.linkedin.com/in/lightballa/'} target='_blank' className='flex flex:none'>
              <Image
                className=" object-scale-down"
                src={linkedInIcon}
                alt="LinkedIn"
                unoptimized
                width={18}
                height={18}
              />

            </Link>
            <span className='pt-0 font-thin text-base'>
              &nbsp;LinkedIn
            </span>

          </div>

          <div className='my-3  font-thin text-base'>
            <Link href={'https://www.figma.com/community/file/1374375841388425315'} target='_blank' className='flex flex:none'>
              <Image
                className="object-scale-down"
                src={figmaIcon}
                alt="Figma"
                unoptimized
                width={14}
                height={11}
              />
              &nbsp; Figma
            </Link>
          </div>

          <div className='my-3  font-thin text-base'>
            <Link href={'https://www.youtube.com/@LightBalla'} target='_blank' className='flex flex:none'>
              <Image
                className="object-scale-down"
                src={youTubeIcon}
                alt="YouTube"
                unoptimized
                width={18}
                height={18}
              />
              &nbsp;YouTube
            </Link>
          </div>
          <div className='my-3  font-thin text-base  align-middle'>
            <Link href={'https://www.instagram.com/lightdesign_ld/'} target='_blank' className='flex flex:none  align-middle'>
              <Image
                className="object-scale-down"
                src={instagramIcon}
                alt="Instagram"
                unoptimized
                width={18}
                height={18}
              />
              &nbsp;Instagram
            </Link>
          </div>

          {/* <div className=''>
              <Link href={'https://x.com/Lite_emmy'} target='_blank' >
                <i className="fab fa-twitter" /> &nbsp; Instagram
              </Link>
            </div>

            <div className=''>
              <Link href={'https://medium.com/@ballalight'} target='_blank' >
                <i className="fab fa-medium" /> &nbsp; Instagram
              </Link>
            </div> */}


        </div>


      </div>

    </article >
  );
}
export default Contact;