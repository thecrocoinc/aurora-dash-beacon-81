
-- Function to get the latest message from each profile
CREATE OR REPLACE FUNCTION public.get_latest_messages_by_profile()
RETURNS TABLE(profile_id uuid, ts timestamptz, last_message text, name text, avatar_url text) AS $$
  select m.profile_id,
         m.created_at    as ts,
         m.content       as last_message,
         p.name,
         p.avatar_url
  from messages m
  join profiles p on p.id = m.profile_id
  join (
        select profile_id, max(created_at) max_ts
        from messages
        group by profile_id
  ) t on t.profile_id = m.profile_id
     and t.max_ts     = m.created_at;
$$ LANGUAGE sql STABLE;
