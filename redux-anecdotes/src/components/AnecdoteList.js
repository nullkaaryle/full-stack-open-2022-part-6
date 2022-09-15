// using older Redux 'connect' here instead of recommended hooks API style,
// that uses 'useDispatch' and 'useSelector'
// See earlier commits to see the hooks style of the components.
import { connect } from 'react-redux'

// importing actions from reducers
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


// the anecdotes state is now in the props after mapping!
const Anecdotes = (props) => {

  const style = {
    marginBottom: 10
  }

  const voteAndNotify = (anecdote) => {
    vote(anecdote)
    notify(anecdote.content)
  }

  const vote = (anecdote) => {
    props.addVote(anecdote)
  }

  const notify = (content) => {
    const message = 'You voted for: '
    props.setNotification(message, content, 5)
  }

  return (
    <div>

      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id} style={style}>

          <div>
            <i> {anecdote.content} </i>
          </div>

          <div>
            has {anecdote.votes} votes {' '}
            <button onClick={() => voteAndNotify(anecdote)}>
              vote
            </button>
          </div>

        </div>
      )}

    </div >
  )
}

// Returns the state of 'anecdotes', filtered and sorted.
// We give the anecdotes state as parameter to the component.
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
      .filter(anecdote =>
        (anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      )
      .sort((a, b) =>
        b.votes - a.votes || a.content.localeCompare(b.content)
      )
  }
}

// these action creators can be used for dispatching in this component
const mapDispatchToProps = {
  addVote,
  setNotification
}

// The connect() function connects the component to the store.
// In other words, connect() wraps the component with additional properties
// and then returns this new "connected" component
// Here, component Anecdotes is wrapped with suitable action creators and state.
export default connect(mapStateToProps, mapDispatchToProps)(Anecdotes)

