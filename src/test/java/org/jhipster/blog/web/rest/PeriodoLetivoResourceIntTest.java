package org.jhipster.blog.web.rest;

import org.jhipster.blog.BlogApp;

import org.jhipster.blog.domain.PeriodoLetivo;
import org.jhipster.blog.repository.PeriodoLetivoRepository;
import org.jhipster.blog.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static org.jhipster.blog.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PeriodoLetivoResource REST controller.
 *
 * @see PeriodoLetivoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlogApp.class)
public class PeriodoLetivoResourceIntTest {

    private static final Long DEFAULT_CODIGO = 1L;
    private static final Long UPDATED_CODIGO = 2L;

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private PeriodoLetivoRepository periodoLetivoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPeriodoLetivoMockMvc;

    private PeriodoLetivo periodoLetivo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PeriodoLetivoResource periodoLetivoResource = new PeriodoLetivoResource(periodoLetivoRepository);
        this.restPeriodoLetivoMockMvc = MockMvcBuilders.standaloneSetup(periodoLetivoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PeriodoLetivo createEntity(EntityManager em) {
        PeriodoLetivo periodoLetivo = new PeriodoLetivo()
            .codigo(DEFAULT_CODIGO)
            .descricao(DEFAULT_DESCRICAO);
        return periodoLetivo;
    }

    @Before
    public void initTest() {
        periodoLetivo = createEntity(em);
    }

    @Test
    @Transactional
    public void createPeriodoLetivo() throws Exception {
        int databaseSizeBeforeCreate = periodoLetivoRepository.findAll().size();

        // Create the PeriodoLetivo
        restPeriodoLetivoMockMvc.perform(post("/api/periodo-letivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(periodoLetivo)))
            .andExpect(status().isCreated());

        // Validate the PeriodoLetivo in the database
        List<PeriodoLetivo> periodoLetivoList = periodoLetivoRepository.findAll();
        assertThat(periodoLetivoList).hasSize(databaseSizeBeforeCreate + 1);
        PeriodoLetivo testPeriodoLetivo = periodoLetivoList.get(periodoLetivoList.size() - 1);
        assertThat(testPeriodoLetivo.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testPeriodoLetivo.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    public void createPeriodoLetivoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = periodoLetivoRepository.findAll().size();

        // Create the PeriodoLetivo with an existing ID
        periodoLetivo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPeriodoLetivoMockMvc.perform(post("/api/periodo-letivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(periodoLetivo)))
            .andExpect(status().isBadRequest());

        // Validate the PeriodoLetivo in the database
        List<PeriodoLetivo> periodoLetivoList = periodoLetivoRepository.findAll();
        assertThat(periodoLetivoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPeriodoLetivos() throws Exception {
        // Initialize the database
        periodoLetivoRepository.saveAndFlush(periodoLetivo);

        // Get all the periodoLetivoList
        restPeriodoLetivoMockMvc.perform(get("/api/periodo-letivos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(periodoLetivo.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())));
    }
    
    @Test
    @Transactional
    public void getPeriodoLetivo() throws Exception {
        // Initialize the database
        periodoLetivoRepository.saveAndFlush(periodoLetivo);

        // Get the periodoLetivo
        restPeriodoLetivoMockMvc.perform(get("/api/periodo-letivos/{id}", periodoLetivo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(periodoLetivo.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPeriodoLetivo() throws Exception {
        // Get the periodoLetivo
        restPeriodoLetivoMockMvc.perform(get("/api/periodo-letivos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePeriodoLetivo() throws Exception {
        // Initialize the database
        periodoLetivoRepository.saveAndFlush(periodoLetivo);

        int databaseSizeBeforeUpdate = periodoLetivoRepository.findAll().size();

        // Update the periodoLetivo
        PeriodoLetivo updatedPeriodoLetivo = periodoLetivoRepository.findById(periodoLetivo.getId()).get();
        // Disconnect from session so that the updates on updatedPeriodoLetivo are not directly saved in db
        em.detach(updatedPeriodoLetivo);
        updatedPeriodoLetivo
            .codigo(UPDATED_CODIGO)
            .descricao(UPDATED_DESCRICAO);

        restPeriodoLetivoMockMvc.perform(put("/api/periodo-letivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPeriodoLetivo)))
            .andExpect(status().isOk());

        // Validate the PeriodoLetivo in the database
        List<PeriodoLetivo> periodoLetivoList = periodoLetivoRepository.findAll();
        assertThat(periodoLetivoList).hasSize(databaseSizeBeforeUpdate);
        PeriodoLetivo testPeriodoLetivo = periodoLetivoList.get(periodoLetivoList.size() - 1);
        assertThat(testPeriodoLetivo.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testPeriodoLetivo.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    public void updateNonExistingPeriodoLetivo() throws Exception {
        int databaseSizeBeforeUpdate = periodoLetivoRepository.findAll().size();

        // Create the PeriodoLetivo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPeriodoLetivoMockMvc.perform(put("/api/periodo-letivos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(periodoLetivo)))
            .andExpect(status().isBadRequest());

        // Validate the PeriodoLetivo in the database
        List<PeriodoLetivo> periodoLetivoList = periodoLetivoRepository.findAll();
        assertThat(periodoLetivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePeriodoLetivo() throws Exception {
        // Initialize the database
        periodoLetivoRepository.saveAndFlush(periodoLetivo);

        int databaseSizeBeforeDelete = periodoLetivoRepository.findAll().size();

        // Get the periodoLetivo
        restPeriodoLetivoMockMvc.perform(delete("/api/periodo-letivos/{id}", periodoLetivo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PeriodoLetivo> periodoLetivoList = periodoLetivoRepository.findAll();
        assertThat(periodoLetivoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PeriodoLetivo.class);
        PeriodoLetivo periodoLetivo1 = new PeriodoLetivo();
        periodoLetivo1.setId(1L);
        PeriodoLetivo periodoLetivo2 = new PeriodoLetivo();
        periodoLetivo2.setId(periodoLetivo1.getId());
        assertThat(periodoLetivo1).isEqualTo(periodoLetivo2);
        periodoLetivo2.setId(2L);
        assertThat(periodoLetivo1).isNotEqualTo(periodoLetivo2);
        periodoLetivo1.setId(null);
        assertThat(periodoLetivo1).isNotEqualTo(periodoLetivo2);
    }
}
