import React from 'react';

//React Router
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Local Imports
import './index.css';

//Pages Imports
import { AboutUs } from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { Login } from './pages/Login';

// Organizations Imports
import OrganizationsPanel from './components/Organizations/OrganizationsPanel';
import OrganizationsRegister from './components/Organizations/OrganizationsRegister';

// Branch Imports
import { BranchDelete } from './components/Branchs/BranchDelete';
import { BranchDetail } from './components/Branchs/BranchDetail';
import {BranchForm} from './components/Branchs/BranchForm';
import { BranchPanel } from './components/Branchs/BranchPanel';
import { BranchUpdate } from './components/Branchs/BranchUpdate';

// Stylist Import
import { StylistsCreate } from './components/StylistsForm/StylistsCreate';
import StylistTable from './components/StylistsForm/StylistsTable';

//Services Imports
import { ServiceDelete } from './components/Services/ServiceDelete';
import { ServiceDetail } from './components/Services/ServiceDetail';
import ServicesForm from './components/Services/ServicesForm.component';
import { ServicesPanel } from './components/Services/ServicesPanel';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/register" element={<OrganizationsRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          {/*Organizations*/}
          <Route
            path="/dashboard/organizations"
            element={<OrganizationsPanel />}
          />
          <Route
            path="/dashboard/organizations/update/:id"
            element={<OrganizationsPanel />}
          />
          <Route
            path="/dashboard/organizations/delete/:id"
            element={<OrganizationsPanel />}
          />
          {/*Branches*/}
          <Route path="/dashboard/branches" element={<BranchPanel />} />
          <Route path="/dashboard/branch/create" element={<BranchForm />} />
          <Route
            path="/dashboard/branch/update/:id"
            element={<BranchUpdate/>}
          />
          <Route path="/dashboard/branch/:id" element={<BranchDetail />} />
          <Route
            path="/dashboard/branch/delete/:id"
            element={<BranchDelete />}
          />
          {/*Stylists*/}
          <Route path="/dashboard/stylists" element={<StylistTable />} />
          <Route path="/dashboard/stylist/create" element={<StylistsCreate />} />
          <Route
            path="/dashboard/stylist/update/:id"
            element={<StylistTable />}
          />
          <Route path="/dashboard/stylist/:id" element={<StylistTable />} />
          <Route
            path="/dashboard/stylist/delete/:id"
            element={<StylistTable />}
          />
          {/*Services*/}
          <Route path="/dashboard/services" element={<ServicesPanel />} />
          <Route path="/dashboard/service/:id" element={<ServiceDetail />} />
          <Route path="/dashboard/service/create" element={<ServicesForm />} />
          <Route
            path="/dashboard/service/update/:id"
            element={<ServicesForm />}
          />
          <Route
            path="/dashboard/service/delete/:id"
            element={<ServiceDelete />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
