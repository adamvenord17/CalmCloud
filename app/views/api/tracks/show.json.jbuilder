json.track do
    json.extract! @track, :id, :user_id, :title, :description, :track_length, :play_count, :created_at
    json.trackAudioUrl url_for(@track.audio_track)
    json.trackArtworkUrl url_for(@track.track_artwork)
end

json.user do
    json.extract! @track.user, :id, :display_name, :username
    if @track.user.profile_pic.attached?
        json.userPictureUrl url_for(@track.user.profile_pic)
    end
end
