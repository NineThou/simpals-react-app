import React from 'react';

class Form extends React.Component {
	//функция преобразующая данные из инпутов и отдающая их в функцию в app.js
	createPost(event) {
		event.preventDefault();
		const post = {
			"id" : Date.now(),
			"title": this.title.value,
			"body": this.text.value,
			"tags": this.tags.value.split(', ')
		}
		//передаём в функцию из app.js
		this.props.addPost(post);
		this.addForm.reset();
	}

	render() {
		const formErrors = this.props.formErrors;
		return (
			<form ref={input => this.addForm = input} className="form-wrap mx-auto mt-5 w-50" onSubmit={this.createPost.bind(this)}>
				<div className='formErrors'>
	    		{Object.keys(formErrors).map((fieldName, i) => {
	      		if(formErrors[fieldName].length > 0){
	        		return (
	          		<p className="error" key={i}>{formErrors[fieldName]}</p>
	        		)        
	      		} else {
	        		return '';
	      		}
	    		})}
	  		</div>
				<h2>Новый пост</h2>
				<div className="input-group mb-3">
  				<input ref={input => this.title = input} name="title" onChange={this.props.handleUserInput.bind(this)} type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Заголовок"/>
				</div>
				<div className="input-group mb-3">					
  				<textarea ref={input => this.text = input} name="text" onChange={this.props.handleUserInput.bind(this)} placeholder="Запись"></textarea>
				</div>
				<div className="input-group mb-3">
  				<input ref={input => this.tags = input} name="tag" onChange={this.props.handleUserInput.bind(this)} type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Тег, еще тег"/>
				</div>
				<button disabled={!this.props.formValid} type="button" className="btn btn-primary" onClick={this.createPost.bind(this)}>Добавить</button>
			</form>
		)
	}
}

export default Form;