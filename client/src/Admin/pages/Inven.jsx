// import React, { useState } from 'react';
// import ANavBar from '../../components/ANavBar';
// import Loading from '../../components/Loading';
// //import BadProduct from '../../components/BadProduct';

// import '../../components/css/Inven.css';
// import AvailableStock from './AvailableStock';
// import ManageStock from './ManageStock';

// function Inven() {
//   const [activeComponent, setActiveComponent] = useState(null);

//   return (
//     <div>
//       <ANavBar />
//       <h2 className="inventory-title">Inventory Management</h2>
//       <div className="inventory-container">
//         <div className="inventory-sidebar">
//         <button
//             className="sidebar-button"
//             onClick={() => setActiveComponent('quicklyLists')}
//           >
//             available stock
//           </button>
//           <button
//             className="sidebar-button"
//             onClick={() => setActiveComponent('badProducts')}
//           >
//             manage stock
//           </button>



//         </div>
//         <div className="inventory-content">
//           {activeComponent === 'badProducts' && <ManageStock/>}
//           {activeComponent === 'quicklyLists' && <AvailableStock/> }
//         </div>
//       </div>
      
//     </div>
//   );
// }

// export default Inven;
import React, { useState } from 'react';
import ANavBar from '../../components/ANavBar';
import Loading from '../../components/Loading';
//import BadProduct from '../../components/BadProduct';

import '../../components/css/Inven.css';
import AvailableStock from './AvailableStock';
import ManageStock from './ManageStock';

function Inven() {
  // Set default active component to 'badProducts' (ManageStock)
  const [activeComponent, setActiveComponent] = useState('badProducts');

  return (
    <div>
      <ANavBar />
      
      <div className="inventory-container">
        <div className="inventory-sidebar">
          <button
            className="sidebar-button"
            onClick={() => setActiveComponent('quicklyLists')}
          >
            Available Stock
          </button>
          <button
            className="sidebar-button"
            onClick={() => setActiveComponent('badProducts')}
          >
            Manage Stock
          </button>
        </div>
        <div className="inventory-content">
          {activeComponent === 'badProducts' && <ManageStock />}
          {activeComponent === 'quicklyLists' && <AvailableStock />}
        </div>
      </div>
    </div>
  );
}

export default Inven;
