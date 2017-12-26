import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class ImageUpload extends Component{
    static defaultProps = {
        showImage:false
    }
    constructor(props){
        super(props)
        this.state = {
            imgPreviewData:null
        }
    }
    
    updatePreview = (e)=>{ 
        const input = e.target 
        if(input.files && input.files.length > 0){
            let reader = new FileReader()
            
            reader.onload = (res)=>{ 
                console.log(res.target)
                this.setState({ imgPreviewData: res.target.result }) 
            }
            this.props.onChange(input.files)
            reader.readAsDataURL(input.files[0])
        }
    }


    render(){
        const { imgPreviewData } = this.state
        const { containerClassNames, imgClassNames, inputClassNames, showImage, previewImgSrc } = this.props
        return (
        <div className={ containerClassNames }>
            { !previewImgSrc && imgPreviewData && showImage && <img alt="Preview Img" src={ imgPreviewData } className={ imgClassNames }/>}
            { previewImgSrc &&  <img alt="Preview Img" src={ previewImgSrc } className={ imgClassNames }/>}
            <input ref={"file"}
                    type="file" 
                    name="file" 
                    id="thing"
                    className={inputClassNames}
                    onChange={this.updatePreview}
                    
            />
        </div>)
    }
}

ImageUpload.propTypes = {
    onChange:PropTypes.func.isRequired,
    containerClassNames:PropTypes.string,
    imgClassNames:PropTypes.string,
    inputClassNames:PropTypes.string,
    showImage:PropTypes.bool, 
    previewImgSrc:PropTypes.string
}