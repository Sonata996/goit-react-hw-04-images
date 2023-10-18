import { MagnifyingGlass } from  'react-loader-spinner'
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { serviceAPI } from "ServiceAPI/ServiceImgAPI";
import { Button } from "./Button/Button";
import { useEffect, useState } from 'react';
import Notiflix from 'notiflix';





export const App = () =>{
const [images, setImages] = useState([])
const [query, setQuery] = useState('')
const [page, setPage] = useState(1)
const [loading, setLoading] = useState(false)
const [loadMore, setloadMore] = useState(0)

const onInputValue = (value) =>{
  if (query === value) {
    return Notiflix.Notify.info('The result has already been found');
    }
setQuery(value)
}


const clickButton = () =>{
setPage(page + 1)
}


 useEffect(() =>{
  if (query === '') {
    return
  }
    setImages([])
    setPage(1)
 },[query])


useEffect(() =>{
  if (query === '') {
    return
  }
  setLoading(true)

  async function setApi() {
    try{
      const servic = await serviceAPI(query, page)
      setImages(prevState => {
       return page === 1 ? servic.data.hits : [...prevState, ...servic.data.hits]
      })
      setloadMore(page < Math.ceil(servic.data.totalHits / 12 ))
    }catch{
      Notiflix.Notify.failure('Qui timide rogat docet negare');
    }finally{
      setLoading(false)
    }
  }

  setApi()
},[query,page])

return (
      <div>
        <Searchbar 
        onInputValue={onInputValue}
        />
        <MagnifyingGlass
        visible={loading}
        height="80"
        width="80"
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor = '#c0efff'
        color = '#e15b64'
      />
  
        {images.length >0 &&(
        <ImageGallery
         arrImg={images}
         />
         )}
  
        {images.length >0 && loadMore &&(
          <Button 
          onClickButton={clickButton}
          />
        )}
        </div>
    )
}





// export class App extends Component{

//   state ={
//     images: [],
//     query:'',
//     page: 1,
//     loading: false,
//     loadMore: 0
//   }

 

// onInputValue = (value) =>{
//   if (this.state.query === value) {
//     return alert('The result has already been found')
//     }
// this.setState({
//   query: value
// })

// }
// clickButton = () =>{
// this.setState({ page: this.state.page + 1})
// }


// async componentDidUpdate(prevProps, prevState){
//   if (prevState.query !== this.state.query) {
//     this.setState({
//       images:[],
//       page: 1
//     })
//   }

//     if ( this.state.query !== prevState.query || prevState.page !== this.state.page) {
//       this.setState({
//         loading: true,
//       })

//       try{
//        const servic = await serviceAPI(this.state.query, this.state.page)
//        this.setState(prevState => ({
//             images: this.state.page === 1 ? servic.data.hits : [...prevState.images, ...servic.data.hits],
//             loadMore: this.state.page < Math.ceil(servic.data.totalHits / 12 )
//           }))
//       } catch{
//         console.log();
//       } finally{
//         this.setState({
//               loading: false,
//             })
//       }
//     }
// }


// render(){
//   const listImg = this.state.images
//   return (
//     <div>
//       <Searchbar 
//       onInputValue={this.onInputValue}
//       />
//       <MagnifyingGlass
//       visible={this.state.loading}
//       height="80"
//       width="80"
//       wrapperClass="MagnifyingGlass-wrapper"
//       glassColor = '#c0efff'
//       color = '#e15b64'
//     />

//       {listImg.length >0 &&(
//       <ImageGallery
//        arrImg={listImg}
//        />
//        )}

//       {listImg.length >0 && this.state.loadMore &&( //
//         <Button 
//         onClickButton={this.clickButton}
//         />
//       )}
//       </div>
//   )
// } 
// };
