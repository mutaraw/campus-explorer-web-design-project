import CommentView from './CommentView';


const CommentsList = ({comments, onDeleteComment}) =>{

    return(
        <div className='commentList'>
            {comments && comments.map((comment)=>(
                 <CommentView key={comment._id} comment={comment} onDeleteComment={onDeleteComment}/>
            ))}
        </div>
    )
}

export default CommentsList;