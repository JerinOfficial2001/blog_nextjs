// import supabaseURLKEY from '@/supabaseURLKEY'
import  Box  from '@mui/material/Box';
import Image from 'next/image';
import React from 'react'
import profileimg from '../assets/profileimg.png'

function Avatar({size}) {
    let width = 'w-12';
    if(size === 'lg'){
        width = 'w-24 md:w-36'
    }
    // const [avatarUrl, setavatarUrl] = useState(null)
    // const [uploading, setuploading] = useState(false)

    // const uploadAvatar = async (e)=>{
    //     try {
    //         setuploading(true)
    //         if(!e.target.files || e.target.files.length ==0){
    //             throw new Error('You must select an image to upload')
    //         }
    //         const file =e.target.files[0]
    //         const fileExt=file.name.split('.').pop()
    //         const fileName =`${Math.random()}.${fileExt}`
    //         const filePath =`${fileName}`
    //         let{error}=await supabaseURLKEY.storage.from('avatars').upload(filePath)
    //         if(uploadError){
    //             throw uploadError
    //         }
    //         onUpload(filePath)
    //     } catch (error) {
            
    //     }
    // }
  return (
    <Box sx={`${width}`}>
            <Image src={profileimg}/>
    </Box>
  )
}

export default Avatar