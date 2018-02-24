import React from 'react';

class Post extends React.Component {
	render() {
		const key = +this.props.index;
		return (
			<li className="post-wrap">
				<h3 className="post-title">{this.props.details.title}</h3>
				<p className="post-text">{this.props.details.body}</p>
				<ul className="tags">
					{
						Object
							.keys(this.props.details.tags)
							.map(key => <a key={key} href="#" className="tags-item"><li>#{this.props.details.tags[key]}</li></a>)
					}
				</ul>
				<button type="button" className="btn btn-danger" onClick={() => this.props.deletePost(key)}>Удалить</button>
			</li>
		)
	}
}

export default Post;