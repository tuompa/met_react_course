import { connect } from 'react-redux';
import * as actions from '../actions/productActions';
import List from '../components/List';

const mapStateToProps = state => ({ items: state.employees });

const mapDispatchToProps = ({
  addItem: actions.addProduct(),
  removeItem: actions.removeProduct(),
  modifyItem: actions.modifyProduct(),
});
export default connect(mapStateToProps, mapDispatchToProps)(List);
