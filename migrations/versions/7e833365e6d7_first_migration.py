"""first migration

Revision ID: 7e833365e6d7
Revises: 
Create Date: 2023-05-17 13:33:14.200699

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '7e833365e6d7'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('doctors',
    sa.Column('ID', sa.Integer(), nullable=False),
    sa.Column('Name', sa.String(length=100), nullable=False),
    sa.Column('Specialty', sa.String(length=100), nullable=False),
    sa.Column('About', sa.Text(), nullable=False),
    sa.Column('Hospital', sa.String(length=100), nullable=False),
    sa.Column('Location', sa.String(length=100), nullable=True),
    sa.Column('Special_Interests', sa.String(length=100), nullable=True),
    sa.Column('Treatments_Offered', sa.String(length=100), nullable=True),
    sa.Column('Work_Experience', sa.String(length=100), nullable=True),
    sa.Column('Image_Src', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('ID')
    )
    op.drop_table('pma__recent')
    op.drop_table('pma__designer_settings')
    with op.batch_alter_table('pma__savedsearches', schema=None) as batch_op:
        batch_op.drop_index('u_savedsearches_username_dbname')

    op.drop_table('pma__savedsearches')
    op.drop_table('pma__table_uiprefs')
    op.drop_table('pma__favorite')
    op.drop_table('pma__users')
    op.drop_table('Doctors')
    op.drop_table('pma__tracking')
    op.drop_table('pma__pdf_pages')
    with op.batch_alter_table('pma__column_info', schema=None) as batch_op:
        batch_op.drop_index('db_name')

    op.drop_table('pma__column_info')
    op.drop_table('pma__table_info')
    op.drop_table('pma__history')
    op.drop_table('pma__userconfig')
    with op.batch_alter_table('pma__export_templates', schema=None) as batch_op:
        batch_op.drop_index('u_user_type_template')

    op.drop_table('pma__export_templates')
    op.drop_table('pma__central_columns')
    op.drop_table('pma__bookmark')
    op.drop_table('pma__table_coords')
    op.drop_table('pma__usergroups')
    op.drop_table('pma__navigationhiding')
    with op.batch_alter_table('pma__relation', schema=None) as batch_op:
        batch_op.drop_index('foreign_field')

    op.drop_table('pma__relation')
    with op.batch_alter_table('doctor_claim_request', schema=None) as batch_op:
        batch_op.drop_constraint('doctor_claim_request_ibfk_1', type_='foreignkey')
        batch_op.create_foreign_key(None, 'doctors', ['doctor_id'], ['ID'])

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['username'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')

    with op.batch_alter_table('doctor_claim_request', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('doctor_claim_request_ibfk_1', 'Doctors', ['doctor_id'], ['ID'])

    op.create_table('pma__relation',
    sa.Column('master_db', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('master_table', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('master_field', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('foreign_db', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('foreign_table', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('foreign_field', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.PrimaryKeyConstraint('master_db', 'master_table', 'master_field'),
    comment='Relation table',
    mysql_collate='utf8mb3_bin',
    mysql_comment='Relation table',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    with op.batch_alter_table('pma__relation', schema=None) as batch_op:
        batch_op.create_index('foreign_field', ['foreign_db', 'foreign_table'], unique=False)

    op.create_table('pma__navigationhiding',
    sa.Column('username', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('item_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('item_type', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('db_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('table_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.PrimaryKeyConstraint('username', 'item_name', 'item_type', 'db_name', 'table_name'),
    comment='Hidden items of navigation tree',
    mysql_collate='utf8mb3_bin',
    mysql_comment='Hidden items of navigation tree',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('pma__usergroups',
    sa.Column('usergroup', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('tab', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('allowed', mysql.ENUM('Y', 'N'), server_default=sa.text("'N'"), nullable=False),
    sa.PrimaryKeyConstraint('usergroup', 'tab', 'allowed'),
    comment='User groups with configured menu items',
    mysql_collate='utf8mb3_bin',
    mysql_comment='User groups with configured menu items',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('pma__table_coords',
    sa.Column('db_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('table_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('pdf_page_number', mysql.INTEGER(), server_default=sa.text("'0'"), autoincrement=False, nullable=False),
    sa.Column('x', mysql.FLOAT(unsigned=True), server_default=sa.text("'0'"), nullable=False),
    sa.Column('y', mysql.FLOAT(unsigned=True), server_default=sa.text("'0'"), nullable=False),
    sa.PrimaryKeyConstraint('db_name', 'table_name', 'pdf_page_number'),
    comment='Table coordinates for phpMyAdmin PDF output',
    mysql_collate='utf8mb3_bin',
    mysql_comment='Table coordinates for phpMyAdmin PDF output',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('pma__bookmark',
    sa.Column('id', mysql.INTEGER(unsigned=True), autoincrement=True, nullable=False),
    sa.Column('dbase', mysql.VARCHAR(collation='utf8mb3_bin', length=255), server_default=sa.text("''"), nullable=False),
    sa.Column('user', mysql.VARCHAR(collation='utf8mb3_bin', length=255), server_default=sa.text("''"), nullable=False),
    sa.Column('label', mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=255), server_default=sa.text("''"), nullable=False),
    sa.Column('query', mysql.TEXT(collation='utf8mb3_bin'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    comment='Bookmarks',
    mysql_collate='utf8mb3_bin',
    mysql_comment='Bookmarks',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('pma__central_columns',
    sa.Column('db_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('col_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('col_type', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('col_length', mysql.TEXT(collation='utf8mb3_bin'), nullable=True),
    sa.Column('col_collation', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('col_isNull', mysql.TINYINT(display_width=1), autoincrement=False, nullable=False),
    sa.Column('col_extra', mysql.VARCHAR(collation='utf8mb3_bin', length=255), server_default=sa.text("''"), nullable=True),
    sa.Column('col_default', mysql.TEXT(collation='utf8mb3_bin'), nullable=True),
    sa.PrimaryKeyConstraint('db_name', 'col_name'),
    comment='Central list of columns',
    mysql_collate='utf8mb3_bin',
    mysql_comment='Central list of columns',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('pma__export_templates',
    sa.Column('id', mysql.INTEGER(unsigned=True), autoincrement=True, nullable=False),
    sa.Column('username', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('export_type', mysql.VARCHAR(collation='utf8mb3_bin', length=10), nullable=False),
    sa.Column('template_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('template_data', mysql.TEXT(collation='utf8mb3_bin'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    comment='Saved export templates',
    mysql_collate='utf8mb3_bin',
    mysql_comment='Saved export templates',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    with op.batch_alter_table('pma__export_templates', schema=None) as batch_op:
        batch_op.create_index('u_user_type_template', ['username', 'export_type', 'template_name'], unique=False)

    op.create_table('pma__userconfig',
    sa.Column('username', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('timevalue', mysql.TIMESTAMP(), server_default=sa.text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), nullable=False),
    sa.Column('config_data', mysql.TEXT(collation='utf8mb3_bin'), nullable=False),
    sa.PrimaryKeyConstraint('username'),
    comment='User preferences storage for phpMyAdmin',
    mysql_collate='utf8mb3_bin',
    mysql_comment='User preferences storage for phpMyAdmin',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('pma__history',
    sa.Column('id', mysql.BIGINT(unsigned=True), autoincrement=True, nullable=False),
    sa.Column('username', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('db', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('table', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('timevalue', mysql.TIMESTAMP(), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
    sa.Column('sqlquery', mysql.TEXT(collation='utf8mb3_bin'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    comment='SQL history for phpMyAdmin',
    mysql_collate='utf8mb3_bin',
    mysql_comment='SQL history for phpMyAdmin',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('pma__table_info',
    sa.Column('db_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('table_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('display_field', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.PrimaryKeyConstraint('db_name', 'table_name'),
    comment='Table information for phpMyAdmin',
    mysql_collate='utf8mb3_bin',
    mysql_comment='Table information for phpMyAdmin',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('pma__column_info',
    sa.Column('id', mysql.INTEGER(unsigned=True), autoincrement=True, nullable=False),
    sa.Column('db_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('table_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('column_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('comment', mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=255), server_default=sa.text("''"), nullable=False),
    sa.Column('mimetype', mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=255), server_default=sa.text("''"), nullable=False),
    sa.Column('transformation', mysql.VARCHAR(collation='utf8mb3_bin', length=255), server_default=sa.text("''"), nullable=False),
    sa.Column('transformation_options', mysql.VARCHAR(collation='utf8mb3_bin', length=255), server_default=sa.text("''"), nullable=False),
    sa.Column('input_transformation', mysql.VARCHAR(collation='utf8mb3_bin', length=255), server_default=sa.text("''"), nullable=False),
    sa.Column('input_transformation_options', mysql.VARCHAR(collation='utf8mb3_bin', length=255), server_default=sa.text("''"), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    comment='Column information for phpMyAdmin',
    mysql_collate='utf8mb3_bin',
    mysql_comment='Column information for phpMyAdmin',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    with op.batch_alter_table('pma__column_info', schema=None) as batch_op:
        batch_op.create_index('db_name', ['db_name', 'table_name', 'column_name'], unique=False)

    op.create_table('pma__pdf_pages',
    sa.Column('db_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('page_nr', mysql.INTEGER(unsigned=True), autoincrement=True, nullable=False),
    sa.Column('page_descr', mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=50), server_default=sa.text("''"), nullable=False),
    sa.PrimaryKeyConstraint('page_nr'),
    comment='PDF relation pages for phpMyAdmin',
    mysql_collate='utf8mb3_bin',
    mysql_comment='PDF relation pages for phpMyAdmin',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('pma__tracking',
    sa.Column('db_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('table_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('version', mysql.INTEGER(unsigned=True), autoincrement=False, nullable=False),
    sa.Column('date_created', mysql.DATETIME(), nullable=False),
    sa.Column('date_updated', mysql.DATETIME(), nullable=False),
    sa.Column('schema_snapshot', mysql.TEXT(collation='utf8mb3_bin'), nullable=False),
    sa.Column('schema_sql', mysql.TEXT(collation='utf8mb3_bin'), nullable=True),
    sa.Column('data_sql', mysql.LONGTEXT(collation='utf8mb3_bin'), nullable=True),
    sa.Column('tracking', mysql.SET('UPDATE', 'REPLACE', 'INSERT', 'DELETE', 'TRUNCATE', 'CREATE DATABASE', 'ALTER DATABASE', 'DROP DATABASE', 'CREATE TABLE', 'ALTER TABLE', 'RENAME TABLE', 'DROP TABLE', 'CREATE INDEX', 'DROP INDEX', 'CREATE VIEW', 'ALTER VIEW', 'DROP VIEW', collation='utf8mb3_bin'), nullable=True),
    sa.Column('tracking_active', mysql.INTEGER(unsigned=True), server_default=sa.text("'1'"), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('db_name', 'table_name', 'version'),
    comment='Database changes tracking for phpMyAdmin',
    mysql_collate='utf8mb3_bin',
    mysql_comment='Database changes tracking for phpMyAdmin',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('Doctors',
    sa.Column('ID', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('Name', mysql.VARCHAR(length=30), nullable=True),
    sa.Column('Specialty', mysql.VARCHAR(length=41), nullable=True),
    sa.Column('About', mysql.VARCHAR(length=1528), nullable=True),
    sa.Column('Hospital', mysql.VARCHAR(length=62), nullable=True),
    sa.Column('Location', mysql.VARCHAR(length=17), nullable=True),
    sa.Column('Special_Interests', mysql.VARCHAR(length=1194), nullable=True),
    sa.Column('Treatments_Offered', mysql.VARCHAR(length=3942), nullable=True),
    sa.Column('Work_Experience', mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=459), nullable=True),
    sa.Column('Image_Src', mysql.VARCHAR(charset='utf8mb3', collation='utf8mb3_general_ci', length=120), nullable=True),
    sa.PrimaryKeyConstraint('ID'),
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('pma__users',
    sa.Column('username', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('usergroup', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.PrimaryKeyConstraint('username', 'usergroup'),
    comment='Users and their assignments to user groups',
    mysql_collate='utf8mb3_bin',
    mysql_comment='Users and their assignments to user groups',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('pma__favorite',
    sa.Column('username', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('tables', mysql.TEXT(collation='utf8mb3_bin'), nullable=False),
    sa.PrimaryKeyConstraint('username'),
    comment='Favorite tables',
    mysql_collate='utf8mb3_bin',
    mysql_comment='Favorite tables',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('pma__table_uiprefs',
    sa.Column('username', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('db_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('table_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('prefs', mysql.TEXT(collation='utf8mb3_bin'), nullable=False),
    sa.Column('last_update', mysql.TIMESTAMP(), server_default=sa.text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), nullable=False),
    sa.PrimaryKeyConstraint('username', 'db_name', 'table_name'),
    comment="Tables' UI preferences",
    mysql_collate='utf8mb3_bin',
    mysql_comment="Tables' UI preferences",
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('pma__savedsearches',
    sa.Column('id', mysql.INTEGER(unsigned=True), autoincrement=True, nullable=False),
    sa.Column('username', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('db_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('search_name', mysql.VARCHAR(collation='utf8mb3_bin', length=64), server_default=sa.text("''"), nullable=False),
    sa.Column('search_data', mysql.TEXT(collation='utf8mb3_bin'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    comment='Saved searches',
    mysql_collate='utf8mb3_bin',
    mysql_comment='Saved searches',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    with op.batch_alter_table('pma__savedsearches', schema=None) as batch_op:
        batch_op.create_index('u_savedsearches_username_dbname', ['username', 'db_name', 'search_name'], unique=False)

    op.create_table('pma__designer_settings',
    sa.Column('username', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('settings_data', mysql.TEXT(collation='utf8mb3_bin'), nullable=False),
    sa.PrimaryKeyConstraint('username'),
    comment='Settings related to Designer',
    mysql_collate='utf8mb3_bin',
    mysql_comment='Settings related to Designer',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.create_table('pma__recent',
    sa.Column('username', mysql.VARCHAR(collation='utf8mb3_bin', length=64), nullable=False),
    sa.Column('tables', mysql.TEXT(collation='utf8mb3_bin'), nullable=False),
    sa.PrimaryKeyConstraint('username'),
    comment='Recently accessed tables',
    mysql_collate='utf8mb3_bin',
    mysql_comment='Recently accessed tables',
    mysql_default_charset='utf8mb3',
    mysql_engine='InnoDB'
    )
    op.drop_table('doctors')
    # ### end Alembic commands ###
