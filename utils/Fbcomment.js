import React from 'react';
import { baseUrl } from './baseUrl'
import { FacebookProvider, Comments, Like } from 'react-facebook';

const Fbcomment = ({url}) => {
  return (
    <div className='bg-light rounded border border-warning pt-2'>
          <FacebookProvider appId="155570839747933" className="row">
            <Like href={`${baseUrl}${url}`} colorScheme="dark" showFaces share />
            <div className='p-2 text-dark'>Mời bạn để lại bình luận hoặc góp ý để bọn mình hoàn thiện nội dung tốt hơn nha</div>
            <Comments href={`${baseUrl}${url}`} />
          </FacebookProvider>
    </div>
  )
}

export default Fbcomment