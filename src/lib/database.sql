
-- Function to get the latest message from each profile
CREATE OR REPLACE FUNCTION public.get_latest_messages_by_profile()
RETURNS TABLE(profile_id uuid, ts timestamptz, last text) AS $$
BEGIN
  RETURN QUERY
    SELECT 
      m.profile_id, 
      max(m.created_at) as ts, 
      (SELECT content FROM messages 
       WHERE profile_id = m.profile_id 
       ORDER BY created_at DESC LIMIT 1) as last
    FROM messages m
    GROUP BY m.profile_id
    ORDER BY ts DESC;
END;
$$ LANGUAGE plpgsql STABLE;
