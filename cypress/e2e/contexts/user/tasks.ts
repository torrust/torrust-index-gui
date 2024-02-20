// Custom tasks for user context

import { type DatabaseConfig, type DatabaseQuery, runDatabaseQuery } from "../../common/database";

// Task to grant admin role to a user by username
export const grantAdminRole = async (username: string, db_config: DatabaseConfig): Promise<number> => {
  let user_id: number;

  try {
    const result = await runDatabaseQuery(getUserIdByUsernameQuery(username), db_config);

    const user_id = result.user_id;

    await runDatabaseQuery(grantAdminRoleQuery(user_id), db_config);

    return user_id;
  } catch (err) {
    return await Promise.reject(err);
  }
};

// Task to delete a user by username
export const deleteUser = async (username: string, db_config: DatabaseConfig): Promise<number> => {
  let user_id: number;

  try {
    const result = await runDatabaseQuery(getUserIdByUsernameQuery(username), db_config);

    const user_id = result.user_id;

    await runDatabaseQuery(deleteUserAuthenticationQuery(user_id), db_config);
    await runDatabaseQuery(deleteUserBansQuery(user_id), db_config);
    await runDatabaseQuery(deleteUserInvitationUsesQuery(user_id), db_config);
    await runDatabaseQuery(deleteUserInvitationsQuery(user_id), db_config);
    await runDatabaseQuery(deleteUserProfileQuery(user_id), db_config);
    await runDatabaseQuery(deleteUserPublicKeysQuery(user_id), db_config);

    await runDatabaseQuery(deleteUserQuery(user_id), db_config);

    return user_id;
  } catch (err) {
    return await Promise.reject(err);
  }
};

// Database query specifications

function getUserIdByUsernameQuery (username: string): DatabaseQuery {
  return {
    query: "SELECT user_id FROM torrust_user_profiles WHERE username = ?",
    params: [username]
  };
}

function grantAdminRoleQuery (user_id: number): DatabaseQuery {
  return {
    query: "UPDATE torrust_users SET administrator = ? WHERE user_id = ?",
    params: [true, user_id]
  };
}

function deleteUserAuthenticationQuery (user_id: number): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_user_authentication WHERE user_id = ?",
    params: [user_id]
  };
}

function deleteUserBansQuery (user_id: number): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_user_bans WHERE user_id = ?",
    params: [user_id]
  };
}

function deleteUserInvitationUsesQuery (user_id: number): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_user_invitation_uses WHERE registered_user_id = ?",
    params: [user_id]
  };
}

function deleteUserInvitationsQuery (user_id: number): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_user_invitations WHERE user_id = ?",
    params: [user_id]
  };
}

function deleteUserProfileQuery (user_id: number): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_user_profiles WHERE user_id = ?",
    params: [user_id]
  };
}

function deleteUserPublicKeysQuery (user_id: number): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_user_public_keys WHERE user_id = ?",
    params: [user_id]
  };
}

function deleteUserQuery (user_id: number): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_users WHERE user_id = ?",
    params: [user_id]
  };
}
