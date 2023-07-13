// Custom tasks for user context

import { DatabaseConfig, DatabaseQuery, runDatabaseQuery } from "../../common/database";

// Task to grant admin role to a user by username
export const grantAdminRole = async (username: string, db_config: DatabaseConfig): Promise<number> => {
  let user_id: number;

  try {
    const result = await runDatabaseQuery(getUserIdByUsernameQuery(username), db_config);

    const user_id = result.user_id;

    await runDatabaseQuery(grantAdminRoleToUserWithId(user_id), db_config);

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

function grantAdminRoleToUserWithId (user_id: number): DatabaseQuery {
  return {
    query: "UPDATE torrust_users SET administrator = ? WHERE user_id = ?",
    params: [true, user_id]
  };
}
