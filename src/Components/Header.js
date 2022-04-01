import PropTypes from 'prop-types';
import { Button } from './Button';

export const Header = ({title, onAdd, showAddTask}) => {
  return (
      <header className="header">
          <div className='row'>
            <div className='col-10'>
                <h1>{title}</h1>
            </div>
            <div className='col-2 d-flex justify-content-end pt-2 pb-2 m-0'>
                <Button color={showAddTask ? 'OrangeRed' : 'green'} text={showAddTask ? 'Close' : 'Add'} onClick={onAdd} />
            </div>
          </div>
      </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string,
}