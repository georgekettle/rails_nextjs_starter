class CreatePasswordResetTokens < ActiveRecord::Migration[8.0]
  def change
    create_table :password_reset_tokens do |t|
      t.references :user, null: false, foreign_key: true
      t.string :token, null: false
      t.datetime :expires_at, null: false
      t.datetime :used_at
      t.string :used_ip_address

      t.timestamps
    end
    add_index :password_reset_tokens, :token, unique: true
    add_index :password_reset_tokens, :expires_at
  end
end