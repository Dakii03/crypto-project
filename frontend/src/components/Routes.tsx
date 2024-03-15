
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Blocks from './Blocks';
import Balance from './Balance';
import Send from './Send';
import Swap from './Swap';

const Routes = () => {
  return (
    <div className="content-wrapper"> {/* Wrapper for content */}
      <RouterRoutes>
        <Route path="/blocks" element={<Blocks />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/send" element={<Send />} />
        <Route path="/swap" element={<Swap />} />
      </RouterRoutes>
    </div>
  );
};

export default Routes;
