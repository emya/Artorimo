import React, { Component, useCallback } from 'react';
import {connect} from 'react-redux';

import Dropzone, { useDropzone } from 'react-dropzone';

import {auth} from "../actions";
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

import '../css/style.scss';

class JoinForm extends Component {
    constructor(props) {
    super(props)
        this.state = {
            imageFiles: []
        }
    }

    onDrop = (imageFiles) => {
        this.setState({
            imageFiles: imageFiles
        })
        console.log(imageFiles)
    }

    DropzoneComponent = () => {
      const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
      }, []);

      const {
        getRootProps,
        getInputProps
      } = useDropzone({
        onDrop
      });

      return (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div>Drag and drop your images here.</div>
        </div>
      )
    }

    render() {
        return(
      <div>
        <Dropzone onDrop={acceptedFiles => this.onDrop(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>

          {/*
        <Dropzone>
          {dropzoneProps => {
            return (
              <div>
                <p>Drop some files here</p>
              </div>
            );
          }}
            <form className='join-form' ref='joinForm' autoComplete='off'>
                <Dropzone
                    onDrop={this.onDrop}
                    className='dropzone'
                    activeClassName='active-dropzone'
                    multiple={false}>
                    <div>Drag and drop or click to select a 550x550px file to upload.</div>
                </Dropzone>

                {this.state.imageFiles.length > 0 ?
                <div>
                    <h2>Uploading {this.state.imageFiles.length} files...</h2>
                    <div>{this.state.imageFiles.map((file) => <img src={file.preview} /> )}</div>
                </div> : null}
            </form>
        </Dropzone>
          */}
      </div>
        )
    }
}

export default JoinForm;