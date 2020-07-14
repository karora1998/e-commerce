package com.upgrad.eshop.users.roles;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class RoleService {


    @Autowired
	private RoleRepository roleRepository;



    public void saveRoleFor(UserRole userRole) {
        Role role = new Role();
        role.setName(userRole.name());
        roleRepository.save(role);
    }

    public Role getForUser() {
        return findByRole(UserRole.USER);
    }
    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    private Role findByRole(UserRole userRole) {

       return roleRepository.findByName(userRole.name());
    }

    public boolean shouldInitialize() {
		return roleRepository.findAll().size() <=0;
	}

    public Role getForInventoryManager() {
         return findByRole(UserRole.INVENTORY_MANAGER);
	}
    public Role getForAdmin()
    {
        return findByRole(UserRole.ADMIN);

	}

}
