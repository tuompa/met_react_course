import { connect } from 'react-redux';
import * as actions from '../actions/employeeActions';
import List from '../components/List';

const mapStateToProps = state => ({ items: state.employees });

const mapDispatchToProps = ({
  addItem: actions.addEmployee,
  removeItem: actions.removeEmployee,
  modifyItem: actions.modifyEmployee,
});
export default connect(mapStateToProps, mapDispatchToProps)(List);
