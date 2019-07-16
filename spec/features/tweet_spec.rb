require 'rails_helper'

feature 'tweet', type: :feature do
  let(:user){ create(:user)}

  scenario 'post tweet' do

    visit root_path
    expect(page).to have_no_content('投稿する')
  end
end
